package com.fairytail.text.controller;

import com.fairytail.text.dto.TextDetailDto;
import com.fairytail.text.dto.TextDto;
import com.fairytail.text.service.TextService;
import com.fairytail.text.util.BadWordsUtils;
import com.fairytail.text.vo.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Api(value = "text")
@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
@CrossOrigin("*")
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

    @ApiOperation(value = "텍스트 메시지 상세조회", notes = "해당 post_id에 해당하는 메시지의 상세 정보가 반환됩니다.")
    @GetMapping("/detail/{post_id}")
    public ResponseEntity<HashMap<String, Object>> getTextDetail(@PathVariable("post_id") Long postId) {
        HashMap<String, Object> resultMap = new HashMap<>();

        TextDetailDto responseDto = textService.getTextDetail(postId, 2L);
        TextDetailResponse responseVo = modelMapper.map(responseDto, TextDetailResponse.class);

        resultMap.put("data", responseVo);
        resultMap.put("message", SUCCESS);

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }

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

    @ApiOperation(value = "내가 등록한 메시지 조회", notes = "해당 user가 작성한 텍스트 메시지의 목록이 반환됩니다.")
    @GetMapping("/mylist/{user_id}")
    public ResponseEntity<HashMap<String, Object>> getMyTextList(@PathVariable("user_id") Long userId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<TextListResponse> responseVoList = new ArrayList<>();

        List<TextDetailDto> responseDtoList = textService.getMyTextList(userId);
        responseDtoList.forEach(v -> {
            responseVoList.add(modelMapper.map(v, TextListResponse.class));
        });

        resultMap.put("data", responseVoList);
        resultMap.put("message", SUCCESS);

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }

    @ApiOperation(value = "주변 메시지 최신순으로 조회", notes = "위도, 경도 0.01 이내 텍스트 메시지의 목록이 최신순으로 반환됩니다.")
    @GetMapping("/vr/latest")
    public ResponseEntity<HashMap<String, Object>> getVrTextListLatest(@RequestParam("lat") Double curLat, @RequestParam("lng") Double curLng) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<TextListResponse> responseVoList = new ArrayList<>();

        List<TextDetailDto> responseDtoList = textService.getVrTextList(curLat, curLng, "latest");
        responseDtoList.forEach(v -> {
            responseVoList.add(modelMapper.map(v, TextListResponse.class));
        });

        resultMap.put("data", responseVoList);
        resultMap.put("message", SUCCESS);

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }

    @ApiOperation(value = "주변 메시지 좋아요순으로 조회", notes = "위도, 경도 0.01 이내 텍스트 메시지의 목록이 좋아요순으로 반환됩니다.")
    @GetMapping("/vr/like")
    public ResponseEntity<HashMap<String, Object>> getVrTextListLike(@RequestParam("lat") Double curLat, @RequestParam("lng") Double curLng) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<TextListResponse> responseVoList = new ArrayList<>();

        List<TextDetailDto> responseDtoList = textService.getVrTextList(curLat, curLng, "like");
        responseDtoList.forEach(v -> {
            responseVoList.add(modelMapper.map(v, TextListResponse.class));
        });

        resultMap.put("data", responseVoList);
        resultMap.put("message", SUCCESS);

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }

    @ApiOperation(value = "모든 메시지 위치 데이터 조회", notes = "모든 텍스트 메시지의 위도, 경도 데이터가 반환됩니다.")
    @GetMapping("/map")
    public ResponseEntity<HashMap<String, Object>> getMapTextList() {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<TextMapResponse> responseVoList = new ArrayList<>();

        List<TextDto> responseDtoList = textService.getAllTextList();
        responseDtoList.forEach(v -> {
            responseVoList.add(modelMapper.map(v, TextMapResponse.class));
        });

        resultMap.put("data", responseVoList);
        resultMap.put("message", SUCCESS);

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }

    @ApiOperation(value = "텍스트 메시지 삭제", notes = "해당 post_id에 해당하는 텍스트 메시지가 삭제됩니다.")
    @DeleteMapping("/{post_id}")
    public ResponseEntity<HashMap<String, Object>> deleteText(@PathVariable("post_id") Long postId) {
        HashMap<String, Object> resultMap = new HashMap<>();

        Integer response = textService.deleteText(postId);

        if (response == 1) resultMap.put("message", SUCCESS);
        else resultMap.put("message", FAIL);

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }

    @ApiOperation(value = "텍스트 메시지 상태 변경", notes = "해당 post_id에 해당하는 메시지의 상태를 변경합니다.")
    @PostMapping("/status")
    public ResponseEntity<HashMap<String, Object>> updateTextStatus(@RequestBody TextStatusRequest requestVo) {
        HashMap<String, Object> resultMap = new HashMap<>();

        TextDetailDto requestDto = modelMapper.map(requestVo, TextDetailDto.class);
        TextDetailDto responseDto = textService.updateTextStatus(requestDto);
        TextDetailResponse responseVo = modelMapper.map(responseDto, TextDetailResponse.class);

        resultMap.put("data", responseVo);
        resultMap.put("message", SUCCESS);

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }





}
