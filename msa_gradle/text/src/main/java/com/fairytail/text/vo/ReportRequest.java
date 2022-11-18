package com.fairytail.text.vo;

import lombok.Data;

@Data
public class ReportRequest {

    private Long userId;

    private Long postId;

    private Integer type;

    private String content;

}
