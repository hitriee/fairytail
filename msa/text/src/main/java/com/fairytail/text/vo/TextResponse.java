package com.fairytail.text.vo;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
public class TextResponse extends TextIdResponse {

    private Long userId;

    private String url;

    private String title;

    private Integer emojiNo;

    private String content;

    private Integer status;

    private Float lat;

    private Float lng;

    private Integer reportCnt;

    private LocalDateTime date;

    private Integer dayType;

}
