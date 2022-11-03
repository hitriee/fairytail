package com.example.testcloud.Mapper;

import com.example.testcloud.DTO.PostDto;
import com.example.testcloud.Entity.Post;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostMapper extends GenericMapper<PostDto, Post>{
}
