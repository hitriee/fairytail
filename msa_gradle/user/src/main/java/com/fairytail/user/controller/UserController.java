package com.fairytail.user.controller;

import com.fairytail.user.dto.UserDto;
import com.fairytail.user.service.UserService;
import com.fairytail.user.vo.RequestFirebase;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.http.HttpHeaders;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @ApiOperation(value = "Firebase Token 저장", notes = "Firebase 토큰 저장을 위한 API 입니다.")
    @PostMapping
    public ResponseEntity<?> firebaseTokenSave(@RequestBody RequestFirebase requestFirebase) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        UserDto userDto = modelMapper.map(requestFirebase, UserDto.class);

        Integer result = userService.saveFirebaseToken(userDto);
        log.debug(result);
        if(result != 1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to save firebase token.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Succeeded to save firebase token.");
    }

    @ApiOperation(value ="비활성화된 유저인지 판단", notes = "비활성화된 유저인지를 확인합니다.")
    @GetMapping("/{userId}")
    public ResponseEntity<?> isAvailableUserId(@PathVariable(value = "userId") Long userId) {
        Boolean result = userService.findUser(userId);
        if(result) return ResponseEntity.status(HttpStatus.OK).body("Available user");
        else return ResponseEntity.status(HttpStatus.OK).body("Unavailable user");
    }


    @ApiOperation(value = "신고 횟수 증가", notes = "UserId의 신고 횟수를 증가시킵니다.")
    @PostMapping("/alert/{userId}")
    public ResponseEntity<?> updateAlert(@PathVariable(value = "userId") Long userId) {
        Integer result = userService.updateAlert(userId);
        if(result != 1) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to to update block cnt.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Succeeded to update block cnt.");
    }

    @ApiOperation(value ="유저 firebase 토큰 가져오기", notes = "유저의 firebase 토큰을 반환합니다.")
    @GetMapping("/token/{userId}")
    public ResponseEntity<?> getFirebaseToken(@PathVariable(value = "userId") Long userId) {
        String result = userService.getFirebaseToken(userId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @ApiOperation(value ="토큰 검사", notes = "액세스 토큰이 유효기간을 검사합니다.")
    @GetMapping("/accesstoken")
    public ResponseEntity<?> updateAlert(HttpServletRequest request) {
       String token = request.getHeader(HttpHeaders.AUTHORIZATION);

       if(!userService.isValidToken(token))
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unavailable Token");
       else
           return ResponseEntity.status(HttpStatus.OK).body("Available Token");
    }
}
