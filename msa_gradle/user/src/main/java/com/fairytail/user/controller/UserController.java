package com.fairytail.user.controller;

import com.fairytail.user.dto.UserDto;
import com.fairytail.user.service.UserService;
import com.fairytail.user.vo.RequestFirebase;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Api(value = "user")
@RestController
@Log4j2
@RequiredArgsConstructor
public class UserController {

    private final ModelMapper modelMapper;
    private final UserService userService;

    @Resource
    private Environment env;

    @ApiOperation(value = "Service 상태 체크", notes = "User Service 상태 체크를 위한 API 입니다.")
    /** Service 상태 체크 (삭제 금지!) */
    @GetMapping("/health_check")
    public String status() {
        // Random으로 할당된 포트 번호 받아오기
        return String.format("User service is working on port %s!", env.getProperty("local.server.port"));
    }

    @ApiOperation(value = "Firebase Token 저장", notes = "FIrebase 토큰 저장을 위한 API 입니다.")
    @PostMapping
    public ResponseEntity<?> firebaseTokenSave(@RequestBody RequestFirebase requestFirebase) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        UserDto userDto = modelMapper.map(requestFirebase, UserDto.class);

        Integer result = userService.saveFirebaseToken(userDto);
        log.debug(result);
        if(result < 1) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save firebase token.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Succeeded to save firebase token.");
    }

    @ApiOperation(value = "Token 체크", notes = "토큰 체크를 위한 API 입니다.")
    @GetMapping
    public String tokenCheck(HttpServletRequest request) {
        return "토큰왔다";
    }

}
