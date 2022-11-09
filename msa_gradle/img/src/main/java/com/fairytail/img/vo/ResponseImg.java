package com.fairytail.img.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseImg {
    private Long postId;
    private Integer userId;
    private Integer type;
    private String url;
    private String title;
    private Integer emojiNo;
    private String content;
    private Double lat;
    private Double lng;
    private LocalDateTime date;
    private Integer status;
}
