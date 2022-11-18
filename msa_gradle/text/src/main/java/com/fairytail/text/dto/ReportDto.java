package com.fairytail.text.dto;

import lombok.Data;

@Data
public class ReportDto {

    private Long reportId;

    private Long postId;

    private Long userId;

    private Integer type;

    private String content;

}
