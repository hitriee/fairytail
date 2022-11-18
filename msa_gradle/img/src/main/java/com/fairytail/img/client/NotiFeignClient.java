package com.fairytail.img.client;

import com.fairytail.img.config.NotiFeignClientConfig;
import com.fairytail.img.dto.NotiRequestDto;
import com.fairytail.img.dto.NotiResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notiFeignClient", url = "https://k7c209.p.ssafy.io", configuration = NotiFeignClientConfig.class)
public interface NotiFeignClient {

    @PostMapping("/fcm")
    NotiResponseDto createNotiLike(@RequestBody NotiRequestDto requestDto);

}
