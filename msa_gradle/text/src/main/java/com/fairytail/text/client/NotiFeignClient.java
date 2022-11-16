package com.fairytail.text.client;

import com.fairytail.text.config.NotiFeignClientConfig;
import com.fairytail.text.dto.NotiRequestDto;
import com.fairytail.text.dto.NotiResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "notiFeignClient", url = "https://k7c209.p.ssafy.io", configuration = NotiFeignClientConfig.class)
public interface NotiFeignClient {

    @PostMapping("/fcm")
    NotiResponseDto createNotiLike(@RequestBody NotiRequestDto requestDto);

}
