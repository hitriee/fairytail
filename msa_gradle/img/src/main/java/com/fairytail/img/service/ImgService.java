package com.fairytail.img.service;

import com.fairytail.img.dto.ImgDto;

import java.util.List;


public interface ImgService {
    ImgDto createImg(ImgDto imgDto) throws Exception;
    ImgDto readImg(Long postId) throws Exception;
    ImgDto putImg(ImgDto imgDto) throws Exception;
    Boolean deleteImg(Long postId) throws Exception;

    List<ImgDto> readImgListLatest(Double lat, Double lng) throws Exception;
    List<ImgDto> readImgListLike(Double lat, Double lng) throws Exception;

    List<ImgDto> readMyImgList(Long userId) throws Exception;

}
