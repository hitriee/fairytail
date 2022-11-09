package com.fairytail.img.service;


import com.fairytail.img.dto.PostDto;
import com.fairytail.img.dto.PostLikeDto;
import com.fairytail.img.jpa.PostEntity;
import com.fairytail.img.jpa.PostLikeEntity;
import com.fairytail.img.jpa.PostLikeRepository;
import com.fairytail.img.jpa.PostRepository;
import com.fairytail.img.util.MainUtil;
import com.fairytail.img.util.S3Util;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;

    private final S3Util s3Util;

    private final MainUtil mainUtil;

    private String dirName = "image";
    @Override
    public PostDto createPost(PostDto postDto) throws IOException {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        PostEntity img = modelMapper.map(postDto, PostEntity.class);
        Long maxIdx = postRepository.getMaxId() + 1;
        MultipartFile file = postDto.getFile();
        File filePath = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename());
        file.transferTo(filePath);
        String url = s3Util.upload(filePath, dirName);
        img.setUrl(url);
        postRepository.save(img);
        data = modelMapper.map(img, PostDto.class);
        filePath.delete();
        return data;
    }

    @Override
    public PostDto readPost(Long postId) {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        Optional<PostEntity> optionalImg = postRepository.findByPostId(postId);
        if(optionalImg.isPresent()){
            PostEntity post = optionalImg.get();
            data = modelMapper.map(post, PostDto.class);
        }
        return data;
    }

    @Override
    public PostDto putPost(PostDto postDto) throws IOException{
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        Optional<PostEntity> optionalImg = postRepository.findByPostId(postDto.getPostId());
        if(optionalImg.isPresent()){
            PostEntity post = optionalImg.get();
            post.setStatus(postDto.getStatus());
            postRepository.save(post);
            data = modelMapper.map(post, PostDto.class);
        }
        return data;
    }

    @Override
    public Boolean deletePost(Long postId) {
        Boolean data = false;
        Optional<PostEntity> optionalImg = postRepository.findByPostId(postId);
        if(optionalImg.isPresent()){
            PostEntity post = optionalImg.get();
            String url = post.getUrl();
            String oldPath = mainUtil.urlToFilePath(url);
            s3Util.delete(oldPath);
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
        List<PostEntity> list = postRepository.findListLatest(lat, lng);
        List<PostDto> data = null;
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
        return null;
    }

    @Override
    public List<PostDto> readMyPostList(Long userId) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        List<PostEntity> list = postRepository.findByUserIdOrderByDateDesc(userId);
        List<PostDto> data = null;
        if(list != null){
            for (PostEntity l :list){
                PostDto insert = modelMapper.map(l, PostDto.class);
                data.add(insert);
            }
        }
        return data;
    }

    @Override
    public PostDto createPostLike(PostLikeDto postLikeDto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        PostLikeEntity postLike = modelMapper.map(postLikeDto, PostLikeEntity.class);
        postLikeRepository.save(postLike);
        Optional<PostEntity> optionalPost = postRepository.findByPostId(postLikeDto.getPostId());
        if(optionalPost.isPresent()){
            PostEntity post = optionalPost.get();
            Long count = postLikeRepository.countByPostId(postLikeDto.getPostId());
            post.setLikeCnt(count);
            postRepository.save(post);
            data = modelMapper.map(post, PostDto.class);
        }
        return data;
    }

    @Override
    public PostDto deletePostLike(PostLikeDto postLikeDto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        Long res = postLikeRepository.deleteByPostIdAndUserId(postLikeDto.getPostId(), postLikeDto.getUserId());
        if(res >= 0){
            Optional<PostEntity> optionalPost = postRepository.findByPostId(postLikeDto.getPostId());
            if(optionalPost.isPresent()){
                PostEntity post = optionalPost.get();
                data = modelMapper.map(post, PostDto.class);
            }
        }
        return data;
    }
}
