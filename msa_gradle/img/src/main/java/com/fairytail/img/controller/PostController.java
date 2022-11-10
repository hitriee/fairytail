package com.fairytail.img.controller;

import com.fairytail.img.dto.PostDto;
import com.fairytail.img.dto.PostLikeDto;
import com.fairytail.img.dto.PostReportDto;
import com.fairytail.img.service.PostService;
import com.fairytail.img.util.S3Util;
import com.fairytail.img.vo.RequestPost;
import com.fairytail.img.vo.RequestPostPut;
import com.fairytail.img.vo.ResponsePost;
import com.fairytail.img.vo.ResponsePostList;
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
@RestController
@RequiredArgsConstructor
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
    @PostMapping("/post")
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
    @GetMapping("/post")
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
    @PutMapping("/post")
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
    @DeleteMapping("/post/{postId}")
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
    @GetMapping("post/list/latest")
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
        } else{
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     * 좌표를 받아서 근처 글 리스트를 좋아요 순으로 25개 조회
     */
    @ApiOperation(value = "근처 이미지 게시글 좋아요 순 리스트 조회(미구현)", notes = "근처 이미지 게시글 좋아요 순 리스트 조회 API 입니다.")
    @GetMapping("post/list/like")
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
        } else{
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }


    /**
     *
     */
    @ApiOperation(value = "내 이미지 게시글 리스트 조회", notes = "내 이미지 게시글 최신순 리스트 조회 API 입니다.")
    @GetMapping("/post/list/{userId}")
    public ResponseEntity<?> readMyPostList(@PathVariable Long userId) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<PostDto> res = postService.readMyPostList(userId);
        List<ResponsePostList> data = new ArrayList<>();
        for (PostDto r:res) {
            ResponsePostList d = modelMapper.map(r, ResponsePostList.class);
            data.add(d);
        }
        if(data != null && !data.isEmpty()){
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
        } else {
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }
    @ApiOperation(value = "게시글 좋아요 누르기", notes = "게시글 좋아요 누르기 API 입니다. 성공 시 좋아요 성공, 좋아요 취소 성공 메시지 출력")
    @PostMapping("/post/like")
    public ResponseEntity<?> createLike(PostLikeDto dto) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        Boolean res = postService.createLike(dto);
        if(res){
            status = HttpStatus.OK;
            resultMap.put("message", "좋아요 성공");
        } else{
            status = HttpStatus.OK;
            resultMap.put("message", "좋아요 취소 성공");
        }
        return new ResponseEntity<>(resultMap, status);
    }
    @ApiOperation(value = "게시글 신고 기능 아직 덜 구현", notes = "")
    @PostMapping("/post/report")
    public ResponseEntity<?> createReport(PostReportDto dto) throws Exception{
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        Boolean res = postService.createReport(dto);
        if(res){
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
