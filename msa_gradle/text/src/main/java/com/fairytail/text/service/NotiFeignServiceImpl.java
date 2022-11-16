package com.fairytail.text.service;

import com.fairytail.text.client.NotiFeignClient;
import com.fairytail.text.dto.NotiRequestDto;
import com.fairytail.text.dto.NotiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotiFeignServiceImpl implements NotiFeignService {

    private final NotiFeignClient notiFeignClient;

    @Override
    public NotiResponseDto createNotiLike(NotiRequestDto requestDto) {
        return notiFeignClient.createNotiLike(requestDto);
    }
}
