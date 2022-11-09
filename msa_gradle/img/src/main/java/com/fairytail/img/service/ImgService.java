package com.fairytail.img.service;

import com.fairytail.img.dto.ImgDto;


public interface ImgService {
    ImgDto createImg(ImgDto imgDto) throws Exception;
    ImgDto readImg(Long postId) throws Exception;
    ImgDto putImg(ImgDto imgDto) throws Exception;
    Boolean deleteImg(Long postId) throws Exception;
}
