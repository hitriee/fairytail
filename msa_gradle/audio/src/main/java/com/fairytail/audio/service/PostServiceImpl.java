package com.fairytail.audio.service;


import com.fairytail.audio.dto.PostDto;
import com.fairytail.audio.dto.PostLikeDto;
import com.fairytail.audio.dto.PostReportDto;
import com.fairytail.audio.jpa.*;
import com.fairytail.audio.util.*;
import com.google.cloud.speech.v1.*;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import com.google.protobuf.ByteString;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
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

    private final BadWordsUtils badWordsUtils;

    private String dirName = "audio";

    private final UserReportFeign userReportFeign;

    /**
     * 게시글 생성
     */
    @Override
    public PostDto createPost(PostDto dto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        PostEntity img = modelMapper.map(dto, PostEntity.class);
        Long maxIdx = postRepository.getMaxId() + 1;
        MultipartFile file = dto.getFile();
        File filePath = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename());
        file.transferTo(filePath);
        File mp3Path = null;
        if(!file.getContentType().contains("mp3")){
            ffmpegUtil.mp3(filePath.getPath());
            mp3Path = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename()+".mp3");
        } else{
            mp3Path = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename());
        }
        /** 음성을 텍스트로 변환 */
        String text = speechToText(mp3Path);

        /** 변환된 텍스트의 금지어 포함 여부 확인 */
        if (!badWordsUtils.filterText(text)) { // 금지어가 포함되어 있지 않을 경우 -> 데이터 저장
            String url = s3Util.upload(filePath, dirName);
            img.setUrl(url);

            LocalDateTime now = LocalDateTime.now(); //현재 날짜 시간 가져오기
            Integer hour = now.getHour(); //현재 시간만 가져오기
            Integer dayType = mainUtil.checkTime(hour); //daytype 체크

            img.setDayType(dayType); //dayType 세팅
            img.setDate(now); //작성 시간 세팅
            img.setContent(text); //변환된 텍스트 세팅

            PostEntity res = postRepository.save(img); //저장

            data = modelMapper.map(res, PostDto.class);
            filePath.delete();
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
     *  신고 누르기
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
     * 신고 5회 이상 게시글 차단
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
     * 모든 게시글 좌표 조회
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

    /** 오디오 파일을 받아 텍스트로 변환하여 그 텍스트를 반환한다. */
    @Override
    public String speechToText(File file) throws IOException {
        String responseTranscription = null;

        try (SpeechClient speech = SpeechClient.create()) {
            ByteString audioBytes = ByteString.copyFrom(Files.readAllBytes(file.toPath()));
            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(AudioEncoding.ENCODING_UNSPECIFIED)
                    .setLanguageCode("ko-KR")
                    .setSampleRateHertz(16000)
                    .build();
            RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(audioBytes).build();

            RecognizeResponse response = speech.recognize(config, audio);
            List<SpeechRecognitionResult> results = response.getResultsList();

            for (SpeechRecognitionResult result : results) {
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                responseTranscription = alternative.getTranscript();
                System.out.printf("Transcription: %s%n", responseTranscription);
            }
        }

        return responseTranscription;
    }

    /**
     * 좋아요 여부 체크 로직
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
