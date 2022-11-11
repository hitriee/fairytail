package com.fairytail.video.vo;

import lombok.Data;

/**
 * 게시글 신고 리퀘스트
 */
@Data
public class RequestReport {
    private Long postId;
    private Long userId;
    private Integer type;
    private String content;
}
