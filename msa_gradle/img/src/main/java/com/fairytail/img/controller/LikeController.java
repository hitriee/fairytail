package com.fairytail.img.controller;


import com.fairytail.img.dto.PostLikeDto;
import com.fairytail.img.service.PostService;
import com.fairytail.img.util.S3Util;
import com.fairytail.img.vo.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Api(value = "like")
@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
public class LikeController {
    private final PostService postService;
    private static HttpStatus status = null;

    private static Map<String, Object> resultMap = null;

    @ApiOperation(value = "게시글 좋아요 누르기", notes = "게시글 좋아요 누르기 API 입니다. 성공 시 좋아요 성공, 좋아요 취소 성공 메시지 출력")
    @PostMapping
    public ResponseEntity<?> createLike(@RequestBody RequestPostLike req) throws Exception{
        ModelMapper modelMapper = new ModelMapper(); //모델 맵퍼 선언
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); //모델 맵퍼 규칙 설정
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostLikeDto dto = modelMapper.map(req, PostLikeDto.class); //req를 dto에 맵핑
        Boolean res = postService.createLike(dto); //좋아요 서비스 실행 true면 좋아요가 눌리고 false면 좋아요 취소
        if(res){
            status = HttpStatus.OK;
            resultMap.put("message", "좋아요 성공");
        } else{
            status = HttpStatus.OK;
            resultMap.put("message", "좋아요 취소 성공");
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
