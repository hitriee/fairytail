package com.example.testcloud.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionAdvice {
//    @ExceptionHandler(MaxUploadSizeExceededException.class)
//    public ResponseEntity<?> maxSizeEx(){
//        Map<String, Object> resultMap = new HashMap<>();
//        resultMap.put("message", "파일이 너무 커요");
//        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
//        return new ResponseEntity<>(resultMap, status);
//    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> extest(){
//        Map<String, Object> resultMap = new HashMap<>();
//        resultMap.put("message", "서버에 에러가 발생했습니다.");
//        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
//        return new ResponseEntity<>(resultMap, status);
//    }
}
