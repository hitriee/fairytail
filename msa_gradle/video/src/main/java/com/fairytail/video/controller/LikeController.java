package com.fairytail.video.controller;


import com.fairytail.video.dto.PostLikeDto;
import com.fairytail.video.service.PostService;
import com.fairytail.video.util.S3Util;
import com.fairytail.video.vo.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Api(value = "like")
@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
public class LikeController {
    @Resource
    private Environment env;
    private final String OKAY= "SUCCESS";
    private final String FAIL= "FAIL";
    private final S3Util s3Util;
    private final PostService postService;
    private static HttpStatus status = null;

    private static Map<String, Object> resultMap = null;

    @ApiOperation(value = "게시글 좋아요 누르기", notes = "게시글 좋아요 누르기 API 입니다. 성공 시 좋아요 성공, 좋아요 취소 성공 메시지 출력")
    @PostMapping
    public ResponseEntity<?> createLike(RequestPostLike req) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); //mapper에서 오류가 생기면 정책을 설정
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostLikeDto dto = modelMapper.map(req, PostLikeDto.class); //req -> dto 매핑
        Boolean res = postService.createLike(dto); //좋아요 누르기 서비스 실행 후 결과 res에 받기
        if(res){ //res가 true면 좋아요를 누르는 것
            status = HttpStatus.OK;
            resultMap.put("message", "좋아요 성공");
        } else{ //res false면 좋아요를 취소 하는 것
            status = HttpStatus.OK;
            resultMap.put("message", "좋아요 취소 성공");
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
