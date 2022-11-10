package com.fairytail.img.vo;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ResponseMyList {
    private Long postId;
    private Integer type;
    private String title;
    private Integer likeCnt;
    private Integer emojiNo;
    private LocalDateTime date;
    private Integer status;
}
