package com.fairytail.text.service;

import com.fairytail.text.dto.LikeDto;

public interface LikeService {

    Integer updateTextLike(LikeDto requestDto);
}
