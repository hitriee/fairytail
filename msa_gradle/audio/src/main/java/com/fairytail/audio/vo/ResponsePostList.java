package com.fairytail.audio.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponsePostList {
    private Long postId;
    private Integer type;
    private String title;
    private Integer likeCnt;
    private Integer emojiNo;
    private LocalDateTime date;
}
