package com.fairytail.alert.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "alert", tags = {"swagger", "v1", "api"})
@RestController
@RequestMapping("/alert")
@RequiredArgsConstructor
public class AlertController {
    private final Environment env;

    @ApiOperation(value = "Service 상태 체크", notes = "Alert Service 상태 체크를 위한 API 입니다.")
    /** Service 상태 체크 (삭제 금지!) */
    @GetMapping("/health_check")
    public String status() {
        // Random으로 할당된 포트 번호 받아오기
        return String.format("Alert service is working on port %s!",
                env.getProperty("local.server.port"));
    }
}
