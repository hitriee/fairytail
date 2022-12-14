package com.fairytail.text.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TextDetailResponse extends TextIdResponse {

    private String title;

    private Long userId;

    private Integer emojiNo;

    private String content;

    private Integer likeCnt;

    private Boolean isLike;

    private LocalDateTime date;

    private Integer dayType;

    private Integer status;

    private String url;

    private Double lat;

    private Double lng;

    private Integer reportCnt;

}
