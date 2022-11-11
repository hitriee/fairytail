package com.fairytail.img.service;

import com.fairytail.img.dto.PostDto;
import com.fairytail.img.dto.PostLikeDto;
import com.fairytail.img.dto.PostReportDto;
import com.fairytail.img.jpa.PostEntity;

import java.util.List;


public interface PostService {
    PostDto createPost(PostDto postDto) throws Exception;
    PostDto readPost(Long postId, Long userId) throws Exception;
    PostDto putPost(PostDto postDto) throws Exception;
    Boolean deletePost(Long postId) throws Exception;

    List<PostDto> readPostListLatest(Double lat, Double lng) throws Exception;
    List<PostDto> readPostListLike(Double lat, Double lng) throws Exception;
    List<PostDto> readMyPostList(Long userId) throws Exception;

    Boolean createLike(PostLikeDto postLikeDto) throws Exception;

    PostDto deletePostLike(PostLikeDto postLikeDto) throws Exception;

    Boolean createReport(PostReportDto postReportDto) throws Exception;

    Boolean changeStatus(PostEntity post)throws Exception;

    List<PostDto> readAllPost() throws Exception;
}
