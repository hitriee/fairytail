package com.fairytail.video.vo;

import lombok.Data;

/**
 * 게시글 상태 변경 리퀘스트
 */
@Data
public class RequestPostPut {
    private Long postId;
    private Integer status;
}
