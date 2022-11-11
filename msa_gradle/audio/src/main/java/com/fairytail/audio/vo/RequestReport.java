package com.fairytail.audio.vo;

import lombok.Data;

@Data
public class RequestReport {
    private Long postId;
    private Long userId;
    private Integer type;
    private String content;
}
