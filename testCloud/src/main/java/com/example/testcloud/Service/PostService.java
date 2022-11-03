package com.example.testcloud.Service;

import com.example.testcloud.DTO.PostDto;

public interface PostService {
    PostDto createPost(PostDto postDto);
    PostDto readPost(Integer postId);

    PostDto putPost(PostDto postDto);

    Boolean deletePost(Integer postId);

}
