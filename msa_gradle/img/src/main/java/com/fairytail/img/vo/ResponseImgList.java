package com.fairytail.img.vo;

import lombok.Data;

@Data
public class ResponseImgList {
    private Long postId;
    private Integer type;
    private String title;
    private Integer likeCnt;
    private Integer emojiNo;
}
