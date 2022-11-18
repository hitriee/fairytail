package com.fairytail.img.controller;

import com.fairytail.img.dto.PostDto;
import com.fairytail.img.dto.PostReportDto;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
    public ResponseEntity<?> createReport(@RequestBody RequestReport req) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostReportDto dto = modelMapper.map(req, PostReportDto.class);
        Boolean res = postService.createReport(dto);
        if(res){
            resultMap.put("message", "신고가 성공했습니다.");
            status = HttpStatus.OK;
        } else{
            resultMap.put("message", "이미 신고했습니다.");
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
