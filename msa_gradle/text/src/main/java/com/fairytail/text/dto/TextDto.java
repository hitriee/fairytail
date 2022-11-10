package com.fairytail.text.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TextDto {

    private Long postId;

    private Long userId;

    private String url;

    private Integer type;

    private String title;

    private Integer emojiNo;

    private String content;

    private Integer status;

    private Double lat;

    private Double lng;

    private Integer reportCnt;

    private LocalDateTime date;

    private Integer dayType;

}
