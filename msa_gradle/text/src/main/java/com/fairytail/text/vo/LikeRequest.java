package com.fairytail.text.vo;

import lombok.Data;

@Data
public class LikeRequest {

    private Long userId;

    private Long postId;

    private Boolean isLike;

}
