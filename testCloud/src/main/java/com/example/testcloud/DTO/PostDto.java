package com.example.testcloud.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostDto {
    private String email;
    private String userName;
    private Integer blockCnt;
    private Integer status;
    private Integer writeCnt;
}
