package com.fairytail.video.service;


import com.fairytail.video.dto.PostDto;
import com.fairytail.video.dto.PostLikeDto;
import com.fairytail.video.dto.PostReportDto;
import com.fairytail.video.jpa.*;
import com.fairytail.video.util.FfmpegUtil;
import com.fairytail.video.util.MainUtil;
import com.fairytail.video.util.S3Util;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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
    @Override
    public PostDto createPost(PostDto dto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        PostEntity img = modelMapper.map(dto, PostEntity.class);
        Long maxIdx = postRepository.getMaxId() + 1;
        MultipartFile file = dto.getFile();
        File filePath = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename());
        file.transferTo(filePath);
        ffmpegUtil.makeThumbNail(filePath.getPath());
        File ThumbPath = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename() + "_thumbnail.png");
        String url = s3Util.upload(filePath, dirName);
        img.setUrl(url);
        postRepository.save(img);
        data = modelMapper.map(img, PostDto.class);
        filePath.delete();
        return data;
    }

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

    @Override
    public PostDto deletePostLike(PostLikeDto dto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        Long res = postLikeRepository.deleteByPostIdAndUserId(dto.getPostId(), dto.getUserId());
        if(res >= 0){
            Optional<PostEntity> optional = postRepository.findByPostId(dto.getPostId());
            if(optional.isPresent()){
                PostEntity post = optional.get();
                data = modelMapper.map(post, PostDto.class);
            }
        }
        return data;
    }

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

    @Override
    public Boolean changeStatus(PostEntity post) throws Exception {
        Integer reportCnt =  post.getReportCnt();
        if(reportCnt >= 5){
            post.setStatus(2);
            postRepository.save(post);
            return true;
        }
        return false;
    }

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

    public Boolean checkLike(Long userId, Long postId) throws Exception{
        Optional<PostLikeEntity> optional = postLikeRepository.findByPostIdAndUserId(userId, postId);
        if (optional.isPresent()){
            return true;
        } else{
            return false;
        }
    }
}
