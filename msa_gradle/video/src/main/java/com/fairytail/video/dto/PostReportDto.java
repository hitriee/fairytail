package com.fairytail.video.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostReportDto {
    private Long reportId;
    private Long postId;
    private Long userId;
    private Integer type;
    private String content;
}
