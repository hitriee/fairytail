package com.fairytail.text.service;

import com.fairytail.text.dto.NotiRequestDto;
import com.fairytail.text.dto.NotiResponseDto;

public interface NotiFeignService {

    NotiResponseDto createNotiLike(NotiRequestDto requestDto);

}
