package com.fairytail.audio.vo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * 게시글 리퀘스트
 */
@Data
public class RequestPost {
    private Long userId;
    private Integer type;
    private String title;
    private String content;
    private Double lat;
    private Double lng;
    private Integer status;
    private MultipartFile file;
    private Integer emojiNo;
}
