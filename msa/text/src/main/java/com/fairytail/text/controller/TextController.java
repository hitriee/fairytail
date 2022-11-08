package com.fairytail.text.controller;

import com.fairytail.text.dto.TextDto;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.mapper.TextMapper;
import com.fairytail.text.service.TextService;
import com.fairytail.text.vo.TextRequest;
import com.fairytail.text.vo.TextResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "text", tags = {"swagger", "v1", "api"})
@RestController
@RequiredArgsConstructor
public class TextController {
    private final Environment env;

    private final TextMapper textMapper;

    private final TextService textService;

    @ApiOperation(value = "Service 상태 체크", notes = "Text Service 상태 체크를 위한 API 입니다.")
    /** Service 상태 체크 (삭제 금지!) */
    @GetMapping("/health_check")
    public String status() {
        // Random으로 할당된 포트 번호 받아오기
        return String.format("Text service is working on port %s!",
                env.getProperty("local.server.port"));
    }

    @ApiOperation(value = "텍스트 메시지 등록", notes = "요청이 성공하면 등록된 메시지의 아이디와 타입 번호가 반환됩니다.")
    @PostMapping
    public ResponseEntity<TextResponse> createText(@RequestBody TextRequest textRequest) {
        TextDto textDto = textMapper.RequestVoToDto(textRequest);


        return null;
    }
}
