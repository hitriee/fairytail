package com.fairytail.audio.client;

import com.fairytail.audio.config.NotiFeignClientConfig;
import com.fairytail.audio.dto.NotiRequestDto;
import com.fairytail.audio.dto.NotiResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notiFeignClient", url = "https://k7c209.p.ssafy.io", configuration = NotiFeignClientConfig.class)
public interface NotiFeignClient {

    @PostMapping("/fcm")
    NotiResponseDto createNotiLike(@RequestBody NotiRequestDto requestDto);

}
