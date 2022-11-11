package com.fairytail.audio.vo;

import lombok.Data;

/**
 * 게시글 공개 여부 수정 리퀘스트
 */
@Data
public class RequestPostPut {
    private Long postId;
    private Integer status;
}
