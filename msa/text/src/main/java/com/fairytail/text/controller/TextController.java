package com.fairytail.text.controller;

import com.fairytail.text.dto.TextDto;
import com.fairytail.text.service.TextService;
import com.fairytail.text.util.BadWordsUtils;
import com.fairytail.text.vo.TextIdResponse;
import com.fairytail.text.vo.TextRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;

@Api(value = "text")
@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class TextController {
    @Resource
    private Environment env;
    private final TextService textService;
    private final BadWordsUtils badWordsUtils;
    private final ModelMapper modelMapper;

    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    @ApiOperation(value = "Service 상태 체크", notes = "Text Service 상태 체크를 위한 API 입니다.")
    /** Service 상태 체크 (삭제 금지!) */
    @GetMapping("/health_check")
    public String status() {
        // Random으로 할당된 포트 번호 받아오기
        return String.format("Text service is working on port %s!",
                env.getProperty("local.server.port"));
    }

//    public ResponseEntity<>

    @ApiOperation(value = "텍스트 메시지 등록", notes = "요청이 성공하면 등록된 메시지의 아이디와 타입 번호가 반환됩니다.")
    @PostMapping
    public ResponseEntity<HashMap<String, Object>> createText(@RequestBody TextRequest requestVo) {
        HashMap<String, Object> resultMap = new HashMap<>();
        TextDto requestDto = modelMapper.map(requestVo, TextDto.class);

        // 텍스트 필터링
        String title = requestDto.getTitle(); // 필터링할 제목
        String content = requestDto.getContent(); // 필터링할 내용

        if (badWordsUtils.filterText(title) || badWordsUtils.filterText(content)) { // 금지어가 있을 경우
            resultMap.put("data", null);
            resultMap.put("message", "금지어 발견");
        }
        else { // 금지어가 없을 경우
            TextDto responseDto = textService.saveText(requestDto); // DB에 저장
            TextIdResponse responseVo = modelMapper.map(responseDto, TextIdResponse.class);
            resultMap.put("data", responseVo);
            resultMap.put("message", SUCCESS);
        }

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }
}
