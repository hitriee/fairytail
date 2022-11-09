package com.fairytail.user.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Api(value = "user")
@RestController
public class UserController {

    @Resource
    private Environment env;

    @ApiOperation(value = "Service 상태 체크", notes = "User Service 상태 체크를 위한 API 입니다.")
    /** Service 상태 체크 (삭제 금지!) */
    @GetMapping("/health_check")
    public String status() {
        // Random으로 할당된 포트 번호 받아오기
        return String.format("User service is working on port %s!", env.getProperty("local.server.port"));
    }

}
