package com.fairytail.img.controller;

import com.fairytail.img.dto.ImgDto;
import com.fairytail.img.service.ImgService;
import com.fairytail.img.util.S3Util;
import com.fairytail.img.vo.ResponseImg;
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
import java.util.List;
import java.util.Map;

@Api(value = "img")
@RestController
@RequiredArgsConstructor
public class ImgController {

    @Resource
    private Environment env;
    private final String OKAY= "SUCCESS";
    private final String FAIL= "FAIL";
    private final S3Util s3Util;
    private final ImgService imgService;
    private static HttpStatus status = null;

    private final ModelMapper modelMapper;

    private static Map<String, Object> resultMap = null;

    @ApiOperation(value = "Service 상태 체크", notes = "Image Service 상태 체크를 위한 API 입니다.")
    /** Service 상태 체크 (삭제 금지!) */
    @GetMapping("/health_check")
    public String status() {
        // Random으로 할당된 포트 번호 받아오기
        return String.format("Image service is working on port %s!", env.getProperty("local.server.port"));
    }

    /**
     * 이미지 게시글 생성
     */
    @PostMapping("/post")
    public ResponseEntity<?> createImg(ImgDto imgDto) throws Exception{
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        ImgDto data = imgService.createImg(imgDto);
        if(data != null){
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     *
     */
    @GetMapping("/post/{postId}")
    public ResponseEntity<?> readImg(@PathVariable Long postId) throws Exception{
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        ImgDto res = imgService.readImg(postId);
        ResponseImg data = modelMapper.map(res, ResponseImg.class);
        if(data != null){
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     *
     */
    @PutMapping("/post")
    public ResponseEntity<?> putImg(ImgDto imgDto) throws Exception{
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        ImgDto res = imgService.putImg(imgDto);
        ResponseImg data = modelMapper.map(res, ResponseImg.class);
        if(res != null){
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     *
     */
    @DeleteMapping("/post/{postId}")
    public ResponseEntity<?> deleteImg(@PathVariable Long postId) throws Exception{
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        Boolean res = imgService.deleteImg(postId);
        if(res){
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     * 좌표를 받아서 근처 글 리스트를 최신 순으로 25개 조회
     */
    @GetMapping("post/list/latest")
    public ResponseEntity<?> readImgListLatest(@RequestParam Double lat, @RequestParam Double lng) throws Exception{
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<ImgDto> res = imgService.readImgListLatest(lat, lng);
        List<ResponseImg> data = null;
        for (ImgDto r:res) {
            ResponseImg d = modelMapper.map(r, ResponseImg.class);
            data.add(d);
        }
        if(data != null){
            resultMap.put("data", res);
            resultMap.put("message", OKAY);
        } else{
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     * 좌표를 받아서 근처 글 리스트를 좋아요 순으로 25개 조회
     */
    @GetMapping("post/list/like")
    public ResponseEntity<?> readImgListLike(@RequestParam Double lat, @RequestParam Double lng) throws Exception{
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(resultMap, status);
    }

}
