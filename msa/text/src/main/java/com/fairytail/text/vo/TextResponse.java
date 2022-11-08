package com.fairytail.text.vo;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class TextResponse {

    private Long postId;

    private Integer type;

    private HttpStatus httpStatus;

    private String messsage;
}
