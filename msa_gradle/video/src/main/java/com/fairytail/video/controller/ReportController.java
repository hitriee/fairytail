package com.fairytail.video.controller;

import com.fairytail.video.dto.PostReportDto;
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
@Api(value = "report")
@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {
    @Resource
    private Environment env;
    private final String OKAY= "SUCCESS";
    private final String FAIL= "FAIL";
    private final S3Util s3Util;
    private final PostService postService;
    private static HttpStatus status = null;

    private static Map<String, Object> resultMap = null;

    @ApiOperation(value = "게시글 신고 기능", notes = "게시글 신고 기능")
    @PostMapping
    public ResponseEntity<?> createReport(RequestReport req) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); //mapper 에러 발생 방지를 위해
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostReportDto dto = modelMapper.map(req, PostReportDto.class); //req -> dto 매핑
        Boolean res = postService.createReport(dto); //서비스 결과 res로
        if(res){//true면 성공
            resultMap.put("message", "신고가 성공했습니다.");
            status = HttpStatus.OK;
        } else{//false면 이미 신고
            resultMap.put("message", "이미 신고했습니다.");
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
