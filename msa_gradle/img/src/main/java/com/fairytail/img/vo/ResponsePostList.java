package com.fairytail.img.vo;

import lombok.Data;

@Data
public class ResponsePostList {
    private Long postId;
    private Integer type;
    private String title;
    private Integer likeCnt;
    private Integer emojiNo;
}
