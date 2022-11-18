package com.fairytail.video.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostLikeDto {
    private Long likeId;
    private Long userId;
    private Long writerId;
    private Long postId;
}
