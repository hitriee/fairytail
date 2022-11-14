package com.fairytail.video.controller;

import com.fairytail.video.dto.PostDto;
import com.fairytail.video.service.PostService;
import com.fairytail.video.util.BadWordsUtils;
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

@Api(value = "video")
@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class PostController {

    @Resource
    private Environment env;
    private final String OKAY= "SUCCESS";
    private final String FAIL= "FAIL";
    private final BadWordsUtils badWordsUtils;
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
    @ApiOperation(value = "게시글 생성", notes = "게시글 생성 API 입니다.")
    @PostMapping
    public ResponseEntity<?> createPost(RequestPost req) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostDto dto = modelMapper.map(req, PostDto.class); //req에서 dto로 매핑

        /** 제목 텍스트 금지어 여부 확인 */
        if (badWordsUtils.filterText(dto.getTitle())) { // 제목에 금지어가 있을 경우
            resultMap.put("message", FAIL); // 등록 실패 : 제목 금지어 발견"
            status = HttpStatus.ACCEPTED;

            return new ResponseEntity<>(resultMap, status);
        }

        PostDto data = postService.createPost(dto); //서비스 결과를 data로 받아오기

        if(data != null){ // dto에 데이터가 있으면 성공 (썸네일이 유해한 이미지로 판단되지 않음)
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{ // 없으면 실패 (썸네일이 유해한 이미지로 판단되어 걸러짐)
            resultMap.put("message", FAIL); // 등록 실패 : 유해한 영상으로 판단됨
            status = HttpStatus.ACCEPTED;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     *이미지 게시글 상세 조회
     */
    @ApiOperation(value = "게시글 상세 조회", notes = "게시글 상세 조회 API 입니다.")
    @GetMapping("/detail")
    public ResponseEntity<?> readPost(@RequestParam Long postId, @RequestParam Long userId) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostDto res = postService.readPost(postId, userId); //서비스 결과를 res에 받아오기
        ResponsePost data = null;
        if(res != null){ //res가 있으면
            data = modelMapper.map(res, ResponsePost.class); //data로 매핑
        }
        if(data != null){ //data가 널이 아니면 성공
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{//실패
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     * 이미지 게시글 공개 여부 수정
     */
    @ApiOperation(value = "게시글 공개 여부 수정", notes = "게시글 공개 여부 수정 API 입니다.")
    @PostMapping("status")
    public ResponseEntity<?> putPost(RequestPostPut req) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        PostDto dto = modelMapper.map(req, PostDto.class); //req -> dto 매핑
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        PostDto res = postService.putPost(dto); //서비스 결과를 res에 받기
        ResponsePost data = null;
        if(res != null){
            data = modelMapper.map(res, ResponsePost.class); //res에 값이 있으면 res -> data 매핑
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
     *
     */
    @ApiOperation(value = "게시글 삭제", notes = "게시글 삭제 API 입니다.")
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
    @ApiOperation(value = "근처 게시글 최신순 리스트 조회", notes = "근처 게시글 최신순 리스트 조회 API 입니다.")
    @GetMapping("/vr/latest")
    public ResponseEntity<?> readPostListLatest(@RequestParam Double lat, @RequestParam Double lng) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<PostDto> res = postService.readPostListLatest(lat, lng); //서비스 실행 후 결과를 res 리스트로
        List<ResponsePostList> data = new ArrayList<>();
        for (PostDto r:res) {
            ResponsePostList insert = modelMapper.map(r, ResponsePostList.class); //res만큼 data에 add
            data.add(insert);
        }
        if(!data.isEmpty()){ //data가 있으면 성공메시지와 data
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{ //data가 없으면 성공 메시지와 빈 data
            resultMap.put("data", data);
            resultMap.put("message", FAIL);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    /**
     * 좌표를 받아서 근처 글 리스트를 좋아요 순으로 25개 조회
     */
    @ApiOperation(value = "근처 게시글 좋아요 순 리스트 조회", notes = "근처 게시글 좋아요 순 리스트 조회 API 입니다.")
    @GetMapping("/vr/like")
    public ResponseEntity<?> readPostListLike(@RequestParam Double lat, @RequestParam Double lng) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<PostDto> res = postService.readPostListLike(lat, lng); //서비스 결과를 res 리스트로
        List<ResponsePostList> data = new ArrayList<>();
        for (PostDto r : res){
            ResponsePostList insert = modelMapper.map(r, ResponsePostList.class); //res가 있으면 매핑
            data.add(insert);
        }
        if (!data.isEmpty()){ //data가 있으면 성공 메시지와 data
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{ //data가 비어있으면 실패메시지와 빈 data
            resultMap.put("data", data);
            resultMap.put("message", FAIL);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }


    /**
     *
     */
    @ApiOperation(value = "내 게시글 리스트 조회", notes = "내 게시글 최신순 리스트 조회 API 입니다.")
    @GetMapping("/mylist/{userId}")
    public ResponseEntity<?> readMyPostList(@PathVariable Long userId) throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<PostDto> res = postService.readMyPostList(userId); //서비스 결과를 res 리스트로
        List<ResponseMyList> data = new ArrayList<>();
        for (PostDto r:res) {
            ResponseMyList d = modelMapper.map(r, ResponseMyList.class); //res에 값을 data로 매핑
            data.add(d);
        }
        if(!data.isEmpty()){ //data가 있으면 성공 메시지와 data
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else { //data가 비어 있으면 실패 메시지와 빈 data
            resultMap.put("data", data);
            resultMap.put("message", FAIL);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }
    @ApiOperation(value = "전체 게시글 좌표 조회", notes = "전체 게시글 좌표 조회 API 입니다.")
    @GetMapping("/map")
    public ResponseEntity<?> readAll() throws Exception{
        ModelMapper modelMapper = new ModelMapper();
        resultMap = new HashMap<>();
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<PostDto> res = postService.readAllPost(); //서비스 결과를 res 리스트로
        List<ResponsePostMap> data = new ArrayList<>();
        for(PostDto r : res){
            ResponsePostMap d = modelMapper.map(r, ResponsePostMap.class);//res를 data로 매핑
            data.add(d);
        }
        if(!data.isEmpty()){ //data가 있으면 성공 메시지와 data
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{ //data가 비어있으면 실패 메시지와 빈 data
            resultMap.put("data", data);
            resultMap.put("message", FAIL);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }

}
