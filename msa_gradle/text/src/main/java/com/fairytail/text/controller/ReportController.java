package com.fairytail.text.controller;

import com.fairytail.text.dto.ReportDto;
import com.fairytail.text.service.ReportService;
import com.fairytail.text.vo.LikeRequest;
import com.fairytail.text.vo.ReportRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/report")
//@CrossOrigin("*")
public class ReportController {

    private final ModelMapper modelMapper;

    private final ReportService reportService;

    @ApiOperation(value = "메시지 신고", notes = "특정 유저의 특정 텍스트 메시지 신고 성공 여부를 변경합니다.")
    @PostMapping
    public ResponseEntity<HashMap<String, Object>> createTextReport(@RequestBody ReportRequest requestVo) {
        HashMap<String, Object> resultMap = new HashMap<>();

        // 연결 전략을 엄격하게 변경하여 같은 타입의 필드명 역시 필드명이 같은 경우만 동작하도록 변경
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        ReportDto requestDto = modelMapper.map(requestVo, ReportDto.class);
        Integer response = reportService.createTextReport(requestDto);

        if (response == 1) { // 신고가 성공했을 경우
            Integer reportCnt = reportService.updateReportCnt(requestDto.getPostId()); // 해당 메시지의 신고횟수 늘려주기
            resultMap.put("message", "신고 성공");

            if (reportCnt == 3) { // 해당 메시지의 신고 횟수가 3번이 됐을 경우
                resultMap.put("message", "신고 성공 : 신고 횟수가 3번이 되어 메시지가 차단됐습니다.");
            }
        }
        else { // 신고가 실패했을 경우
            resultMap.put("message", "신고 실패 : 해당 유저가 이미 신고를 한 글입니다.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }

}
