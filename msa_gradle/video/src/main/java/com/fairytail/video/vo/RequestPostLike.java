package com.fairytail.video.vo;

import lombok.Data;
/**
 * 게시글 좋아요 리퀘스트
 */
@Data
public class RequestPostLike {
    private Long userId;
    private Long writerId;
    private Long postId;
}
