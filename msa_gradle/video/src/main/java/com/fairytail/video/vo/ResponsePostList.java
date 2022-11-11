package com.fairytail.video.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 게시글 리스트 조회 리스폰스
 */
@Data
public class ResponsePostList {
    private Long postId;
    private Integer type;
    private String title;
    private Integer likeCnt;
    private Integer emojiNo;
    private LocalDateTime date;
}
