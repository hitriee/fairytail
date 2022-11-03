package com.example.testcloud.DTO;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@Builder
public class PostDto {
    private Integer postId;
    private Integer userId;
    private String type;
    private String url;
    private String title;
    private Integer emojiNo;
    private String content;
    private Double lat;
    private Double lng;
    private LocalDateTime date;
    private String status;
    private MultipartFile file;
}
