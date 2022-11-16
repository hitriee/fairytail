package com.fairytail.text.controller;

import com.fairytail.text.dto.LikeDto;
import com.fairytail.text.dto.TextDetailDto;
import com.fairytail.text.service.LikeService;
import com.fairytail.text.vo.TextDetailResponse;
import com.fairytail.text.vo.LikeRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Api(value = "text")
@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
@CrossOrigin("*")
public class LikeController {

    private final ModelMapper modelMapper;

    private final LikeService likeService;

    @ApiOperation(value = "좋아요 여부 변경", notes = "특정 유저의 특정 텍스트 메시지 좋아요 여부를 변경합니다.")
    @PostMapping
    public ResponseEntity<HashMap<String, Object>> updateTextLike(@RequestBody LikeRequest requestVo) {
        HashMap<String, Object> resultMap = new HashMap<>();

        // 연결 전략을 엄격하게 변경하여 같은 타입의 필드명 역시 필드명이 같은 경우만 동작하도록 변경
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        LikeDto requestDto = modelMapper.map(requestVo, LikeDto.class);
        Integer response = likeService.updateTextLike(requestDto);

        if (response == 1) resultMap.put("message", "좋아요 생성 성공");
        else resultMap.put("message", "좋아요 해제 성공");

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }

}
