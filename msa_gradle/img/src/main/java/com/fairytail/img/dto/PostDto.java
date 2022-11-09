package com.fairytail.img.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Long postId;
    private Long userId;
    private Integer type;
    private String url;
    private String title;
    private Integer emojiNo;
    private String content;
    private Double lat;
    private Double lng;
    private LocalDateTime date;
    private Integer status;
    private MultipartFile file;
    private Integer likeCnt;
}
