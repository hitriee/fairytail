package com.fairytail.img.service;

import com.fairytail.img.dto.PostDto;
import com.fairytail.img.dto.PostLikeDto;

import java.util.List;


public interface PostService {
    PostDto createPost(PostDto postDto) throws Exception;
    PostDto readPost(Long postId) throws Exception;
    PostDto putPost(PostDto postDto) throws Exception;
    Boolean deletePost(Long postId) throws Exception;

    List<PostDto> readPostListLatest(Double lat, Double lng) throws Exception;
    List<PostDto> readPostListLike(Double lat, Double lng) throws Exception;
    List<PostDto> readMyPostList(Long userId) throws Exception;

    PostDto createPostLike(PostLikeDto postLikeDto) throws Exception;

    PostDto deletePostLike(PostLikeDto postLikeDto) throws Exception;

}
