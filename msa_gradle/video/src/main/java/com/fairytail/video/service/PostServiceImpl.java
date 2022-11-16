package com.fairytail.video.service;


import com.fairytail.video.dto.PostDto;
import com.fairytail.video.dto.PostLikeDto;
import com.fairytail.video.dto.PostReportDto;
import com.fairytail.video.jpa.*;
import com.fairytail.video.util.FfmpegUtil;
import com.fairytail.video.util.MainUtil;
import com.fairytail.video.util.S3Util;
import com.fairytail.video.util.UserReportFeign;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;

    private final PostReportRepository postReportRepository;

    private final S3Util s3Util;

    private final MainUtil mainUtil;

    private final FfmpegUtil ffmpegUtil;

    private String dirName = "video";

    private final UserReportFeign userReportFeign;

    /**
     * 게시글 생성
     */
    @Override
    public PostDto createPost(PostDto dto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        PostEntity img = modelMapper.map(dto, PostEntity.class); //dto -> entity 매핑
        Long maxIdx = postRepository.getMaxId() + 1; //s3 저장 파일에 idx를 넣어주기 위해 조회
        MultipartFile file = dto.getFile(); //dto file 가져와서
        File filePath = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename());//저장경로/ + 저장할 컨텐츠 타입 이름(dirName) + 인덱스 값 + 파일 이름
        file.transferTo(filePath);
        ffmpegUtil.makeThumbNail(filePath.getPath());
        File thumbPath = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename() + "_thumbnail.png"); //저장경로/ + 저장할 컨텐츠 타입 이름(dirName) + 인덱스 값 + 파일 이름 + 썸네일.png

        InputStream inputStream = new FileInputStream(thumbPath); // 썸네일 이미지를 InputStream으로 변환

        /** 썸네일 유해성 여부 판단 */
        Integer safeSearchResult = detectSafeSearch(inputStream);

        /** 이미지 유해성 필터링 서비스 실행 */
        if (safeSearchResult == 0) { // 유해 이미지로 판단되지 않음
            String url = s3Util.upload(filePath, dirName);//s3 업로드(File, 폴더이름 String)
            img.setUrl(url); //s3 저장 후 받은 url로 entity 세팅

            LocalDateTime now = LocalDateTime.now(); //현재 시간 받아서
            Integer hour =  now.getHour(); //시간만 받고
            Integer dayType = mainUtil.checkTime(hour); //dayType 계산

            img.setDayType(dayType); //dayType값 넣어주기
            img.setDate(now);
            PostEntity res = postRepository.save(img); //저장
            data = modelMapper.map(res, PostDto.class); //dto로 매핑
            filePath.delete();//사용한 파일 삭제
        }

        return data;
    }

    /**
     * 게시글 상세 조회
     */
    @Override
    public PostDto readPost(Long postId, Long userId) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        Optional<PostEntity> optional = postRepository.findByPostId(postId);
        if(optional.isPresent()){
            PostEntity post = optional.get();
            data = modelMapper.map(post, PostDto.class);
            Boolean isLike = checkLike(postId, userId);
            data.setIsLike(isLike);
        }
        return data;
    }

    /**
     * 게시글 공개, 비공개 수정
     */
    @Override
    public PostDto putPost(PostDto dto) throws IOException{
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        Optional<PostEntity> optional = postRepository.findByPostId(dto.getPostId());
        if(optional.isPresent()){
            PostEntity post = optional.get();
            post.setStatus(dto.getStatus());
            postRepository.save(post);
            data = modelMapper.map(post, PostDto.class);
        }
        return data;
    }

    /**
     * 게시글 삭제 
     */
    @Override
    public Boolean deletePost(Long postId) {
        Boolean data = false;
        Optional<PostEntity> optional = postRepository.findByPostId(postId);
        if(optional.isPresent()){
            PostEntity post = optional.get();
            String url = post.getUrl();
            String oldPath = mainUtil.urlToFilePath(url);
            if(oldPath != null){
                s3Util.delete(oldPath);
            }
            Long res = postRepository.deleteByPostId(post.getPostId());
            if(res != 0){
                data = true;
            }
        }
        return data;
    }

    /**
     * 근처 게시글 최신순 조회
     */
    @Override
    public List<PostDto> readPostListLatest(Double lat, Double lng) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        List<PostEntity> list = postRepository.findTop25ByLatAndLngAndStatusOrderByDateDesc(lat, lng);
        List<PostDto> data = new ArrayList<>();
        if(list != null){
            for (PostEntity l: list) {
                PostDto insert = modelMapper.map(l, PostDto.class);
                data.add(insert);
            }
        }
        return data;
    }

    /**
     * 근처 게시글 좋아요 순 조회
     */
    @Override
    public List<PostDto> readPostListLike(Double lat, Double lng) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        List<PostEntity> list = postRepository.findTop25ByLatAndLngAndStatusOrderByLikeCntDesc(lat, lng);
        List<PostDto> data = new ArrayList<>();
        if(list != null){
            for (PostEntity l: list) {
                PostDto insert = modelMapper.map(l, PostDto.class);
                data.add(insert);
            }
        }
        return data;
    }

    /**
     * 내 게시글 최신순 조회
     */
    @Override
    public List<PostDto> readMyPostList(Long userId) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        List<PostEntity> list = postRepository.findByUserIdOrderByDateDesc(userId);
        List<PostDto> data = new ArrayList<>();
        if(list != null){
            for (PostEntity l :list){
                PostDto insert = modelMapper.map(l, PostDto.class);
                data.add(insert);
            }
        }
        return data;
    }

    /**
     * 좋아요, 좋아요 취소 누르기
     */
    @Override
    public Boolean createLike(PostLikeDto dto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        Optional<PostLikeEntity> optionalLike = postLikeRepository.findByPostIdAndUserId(dto.getPostId(), dto.getUserId());
        if(optionalLike.isPresent()){
            PostLikeEntity like = optionalLike.get();
            postLikeRepository.delete(like);
            Optional<PostEntity> optional = postRepository.findByPostId(dto.getPostId());
            if(optional.isPresent()){
                PostEntity post = optional.get();
                Long count = postLikeRepository.countByPostId(dto.getPostId());
                post.setLikeCnt(count);
                postRepository.save(post);
            }
            return false;
        } else{
            PostLikeEntity postLike = modelMapper.map(dto, PostLikeEntity.class);
            postLikeRepository.save(postLike);
            Optional<PostEntity> optional = postRepository.findByPostId(dto.getPostId());
            if(optional.isPresent()){
                PostEntity post = optional.get();
                Long count = postLikeRepository.countByPostId(dto.getPostId());
                post.setLikeCnt(count);
                postRepository.save(post);
            }
            return true;
        }
    }

    /**
     * 신고하기
     */
    @Override
    public Boolean createReport(PostReportDto dto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Optional<PostReportEntity> optional = postReportRepository.findByPostIdAndUserId(dto.getPostId(), dto.getUserId());
        if (optional.isPresent()){
            return false;
        } else{
            PostReportEntity postReport = modelMapper.map(dto, PostReportEntity.class);
            postReportRepository.save(postReport);
            Optional<PostEntity> optionalPost = postRepository.findByPostId(dto.getPostId());
            if(optionalPost.isPresent()){
                PostEntity post = optionalPost.get();
                post.setReportCnt(post.getReportCnt() + 1);
                postRepository.save(post);
                changeStatus(post);
                return true;
            } else{
                return false;
            }
        }
    }

    /**
     * 신고 5회 넘은 게시글 차단
     */
    @Override
    public Boolean changeStatus(PostEntity post) throws Exception {
        Integer reportCnt =  post.getReportCnt();
        if(reportCnt >= 3){
            post.setStatus(2);
            postRepository.save(post);
            userReportFeign.userReport(post.getUserId());
            return true;
        }
        return false;
    }

    /**
     * 전체 게시글 좌표 조회
     */
    @Override
    public List<PostDto> readAllPost() throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        List<PostDto> data = new ArrayList<>();
        List<PostEntity> res = postRepository.findAllByStatus(0);
        for (PostEntity r: res) {
            PostDto d = modelMapper.map(r, PostDto.class);
            data.add(d);
        }
        return data;
    }

    /** 이미지의 유해성 여부를 판별해서 유해하면 1을 유해하지 않으면 0을 에러 발생시 -1 반환 */
    @Override
    public Integer detectSafeSearch(InputStream inputStream) throws IOException {
        String responseAnnotation = null;
        Integer result = 0; // 이미지의 유해성 여부 (1: 유해함, 0: 유해하지 않음)
        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString imgBytes = ByteString.readFrom(inputStream);

        Image img = Image.newBuilder().setContent(imgBytes).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.SAFE_SEARCH_DETECTION).build();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    return -1;
                }

                // For full list of available annotations, see http://g.co/cloud/vision/docs
                SafeSearchAnnotation annotation = res.getSafeSearchAnnotation();

                // 이미지의 각 유해성 판단 값 점수로 저장
                int violence = annotation.getViolenceValue();
                int racy = annotation.getRacyValue();
                int medical = annotation.getMedicalValue();
                int adult = annotation.getAdultValue();

                // 각 판단 기준을 하나라도 위반할 시 유해한 이미지로 인식
                if (violence >= 3 || racy >= 5 || medical >= 4 || adult >= 4)
                    result = 1;
            }
        }

        return result;
    }

    /**
     * 좋아요 누른지 체크 하는 로직
     */
    public Boolean checkLike(Long userId, Long postId) throws Exception{
        Optional<PostLikeEntity> optional = postLikeRepository.findByPostIdAndUserId(userId, postId);
        if (optional.isPresent()){
            return true;
        } else{
            return false;
        }
    }
}
