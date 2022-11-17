package com.fairytail.text.dto;

import lombok.Data;

@Data
public class LikeDto {

    private Long likeId;

    private Long postId;

    private Long userId;

    private Long writerId;

}
