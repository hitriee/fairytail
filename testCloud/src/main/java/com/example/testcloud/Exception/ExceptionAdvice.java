package com.example.testcloud.Exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public String exctest(){
        return "파일이 너무 커용";
    }
}
