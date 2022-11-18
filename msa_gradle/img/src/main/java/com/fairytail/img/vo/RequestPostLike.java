package com.fairytail.img.vo;

import lombok.Data;

@Data
public class RequestPostLike {
    private Long userId;
    private Long writerId;
    private Long postId;
}
