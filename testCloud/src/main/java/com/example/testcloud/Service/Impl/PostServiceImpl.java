package com.example.testcloud.Service.Impl;

import com.example.testcloud.DTO.PostDto;
import com.example.testcloud.Entity.Post;
import com.example.testcloud.Mapper.PostMapper;
import com.example.testcloud.Repository.PostRepository;
import com.example.testcloud.Service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostMapper postMapper;

    private final PostRepository postRepository;
    @Override
    public PostDto createPost(PostDto postDto) {
        PostDto data = null;
        Post post = postMapper.toEntity(postDto);
        postRepository.save(post);
        data = postMapper.toDto(post);
        return data;
    }

    @Override
    public PostDto readPost(Integer postId) {
        Optional<Post> optionalPost = postRepository.findByPostId(postId);
        PostDto data = null;
        if(optionalPost.isPresent()){
            Post post = optionalPost.get();
            data = postMapper.toDto(post);
        }
        return data;
    }

    @Override
    public PostDto putPost(PostDto postDto) {
        Optional<Post> optionalPost = postRepository.findByPostId(postDto.getPostId());
        PostDto data = null;
        if(optionalPost.isPresent()){
            Post post = optionalPost.get();
            postMapper.updateFromDto(postDto, post);
            postRepository.save(post);
            data = postMapper.toDto(post);
        }
        return data;
    }

    @Override
    public Boolean deletePost(Integer postId) {
        Integer res = postRepository.deleteByPostId(postId);
        if(res == 0){
            return false;
        } else{
            return true;
        }
    }
}
