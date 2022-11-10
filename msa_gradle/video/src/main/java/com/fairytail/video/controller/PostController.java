package com.fairytail.video.controller;

import com.fairytail.video.dto.PostDto;
import com.fairytail.video.service.PostService;
import com.fairytail.video.util.S3Util;
import com.fairytail.video.vo.*;
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
import java.util.Map;

@Api(value = "img")
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class PostController {

    @Resource
    private Environment env;
    private final String OKAY= "SUCCESS";
    private final String FAIL= "FAIL";
    private final S3Util s3Util;
    private final PostService postService;
    private static HttpStatus status = null;

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
    @ApiOperation(value = "이미지 게시글 생성", notes = "이미지 게시글 생성 API 입니다.")
    @PostMapping
    public ResponseEntity<?> createPost(RequestPost req) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostDto dto = modelMapper.map(req, PostDto.class);
        PostDto data = postService.createPost(dto);
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
     *이미지 게시글 상세 조회
     */
    @ApiOperation(value = "이미지 게시글 상세 조회", notes = "이미지 게시글 상세 조회 API 입니다.")
    @GetMapping("/detail")
    public ResponseEntity<?> readPost(@RequestParam Long postId, @RequestParam Long userId) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostDto res = postService.readPost(postId, userId);
        ResponsePost data = null;
        if(res != null){
            data = modelMapper.map(res, ResponsePost.class);
        }
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
     * 이미지 게시글 공개 여부 수정
     */
    @ApiOperation(value = "이미지 게시글 공개 여부 수정", notes = "이미지 게시글 공개 여부 수정 API 입니다.")
    @PostMapping("status")
    public ResponseEntity<?> putPost(RequestPostPut req) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        PostDto dto = modelMapper.map(req, PostDto.class);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostDto res = postService.putPost(dto);
        ResponsePost data = null;
        if(res != null){
            data = modelMapper.map(res, ResponsePost.class);
        }
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
    @ApiOperation(value = "이미지 게시글 삭제", notes = "이미지 게시글 삭제 API 입니다.")
    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId) throws Exception{
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        Boolean res = postService.deletePost(postId);
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
    @ApiOperation(value = "근처 이미지 게시글 최신순 리스트 조회", notes = "근처 이미지 게시글 최신순 리스트 조회 API 입니다.")
    @GetMapping("/vr/latest")
    public ResponseEntity<?> readPostListLatest(@RequestParam Double lat, @RequestParam Double lng) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<PostDto> res = postService.readPostListLatest(lat, lng);
        List<ResponsePostList> data = new ArrayList<>();
        for (PostDto r:res) {
            ResponsePostList insert = modelMapper.map(r, ResponsePostList.class);
            data.add(insert);
        }
        if(!data.isEmpty()){
            resultMap.put("data", res);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{
            resultMap.put("message", FAIL);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     * 좌표를 받아서 근처 글 리스트를 좋아요 순으로 25개 조회
     */
    @ApiOperation(value = "근처 이미지 게시글 좋아요 순 리스트 조회", notes = "근처 이미지 게시글 좋아요 순 리스트 조회 API 입니다.")
    @GetMapping("/vr/like")
    public ResponseEntity<?> readPostListLike(@RequestParam Double lat, @RequestParam Double lng) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<PostDto> res = postService.readPostListLike(lat, lng);
        List<ResponsePostList> data = new ArrayList<>();
        for (PostDto r : res){
            ResponsePostList insert = modelMapper.map(r, ResponsePostList.class);
            data.add(insert);
        }
        if (!data.isEmpty()){
            resultMap.put("data", res);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{
            resultMap.put("message", FAIL);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }


    /**
     *
     */
    @ApiOperation(value = "내 이미지 게시글 리스트 조회", notes = "내 이미지 게시글 최신순 리스트 조회 API 입니다.")
    @GetMapping("/mylist/{userId}")
    public ResponseEntity<?> readMyPostList(@PathVariable Long userId) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<PostDto> res = postService.readMyPostList(userId);
        List<ResponseMyList> data = new ArrayList<>();
        for (PostDto r:res) {
            ResponseMyList d = modelMapper.map(r, ResponseMyList.class);
            data.add(d);
        }
        if(!data.isEmpty()){
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else {
            resultMap.put("message", FAIL);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }


}
