package com.fairytail.text.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TextListResponse {

    private String title;

    private Integer emojiNo;

    private Long postId;

    private LocalDateTime date;

    private Integer likeCnt;

    private Integer type;

    private Integer status;

}
