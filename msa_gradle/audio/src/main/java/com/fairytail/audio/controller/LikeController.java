package com.fairytail.audio.controller;


import com.fairytail.audio.dto.PostLikeDto;
import com.fairytail.audio.service.PostService;
import com.fairytail.audio.vo.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<?> createLike(RequestPostLike req) throws Exception{
        ModelMapper modelMapper = new ModelMapper(); //모델 맵퍼 선언
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); //모델 맵퍼 규칙 설정
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostLikeDto dto = modelMapper.map(req, PostLikeDto.class); //req를 dto에 맵핑
        Boolean res = postService.createLike(dto); //좋아요 서비스 실행 true면 좋아요가 눌리고 false면 좋아요 취소
        if(res){//res true면 좋아요 누르기
            status = HttpStatus.OK;
            resultMap.put("message", "좋아요 성공");
        } else{ //res false면 좋아요 취소 누르기
            status = HttpStatus.OK;
            resultMap.put("message", "좋아요 취소 성공");
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
