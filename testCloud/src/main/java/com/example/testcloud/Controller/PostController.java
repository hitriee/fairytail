package com.example.testcloud.Controller;

import com.example.testcloud.DTO.PostDto;
import com.example.testcloud.Service.PostService;
import com.example.testcloud.Util.OsCheckUtil;
import com.example.testcloud.Util.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final String OKAY= "SUCCESS";
    private final String FAIL= "FAIL";
    private final S3Util s3Util;

    private final OsCheckUtil osCheckUtil;

    private final PostService postService;
    private static HttpStatus status = null;

    @PostMapping("/post")
    public ResponseEntity<?> createPost(PostDto postDto) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();
        PostDto data = null;
        if(postDto.getType().equals("string")){
            data = postService.createPost(postDto);
        } else{
            String rootPath= osCheckUtil.osCheck();
//            String fileName =
//            File newfile = new File(rootPath+"/" + postDto.getFile().getOriginalFilename());
//            postDto.getFile().transferTo(newfile);
//            s3Util.upload();
            data = postService.createPost(postDto);
        }
        if(data != null){
            resultMap.put("data", data);
            status = HttpStatus.OK;
        } else{
            resultMap.put("data", data);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/post/{idx}")
    public ResponseEntity<?> readPost(@PathVariable Integer idx){
        Map<String, Object> resultMap = new HashMap<>();
        PostDto data = postService.readPost(idx);
        if (data != null){
            resultMap.put("data", data);
            resultMap.put("message", OKAY);
            status = HttpStatus.OK;
        } else{
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/post")
    public ResponseEntity<?> putPost(PostDto postDto){
        Map<String, Object> resultMap = new HashMap<>();
        PostDto data = postService.putPost(postDto);
        if(data != null){
            status = HttpStatus.OK;
            resultMap.put("message", OKAY);
            resultMap.put("data", data);
        } else{
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", FAIL);
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @DeleteMapping("/post/{idx}")
    public ResponseEntity<?> deletePost(@PathVariable Integer idx){
        Map<String, Object> resultMap = new HashMap<>();
        boolean res = postService.deletePost(idx);
        if (res){
            status = HttpStatus.OK;
            resultMap.put("message", OKAY);
        } else{
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
