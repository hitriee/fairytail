package com.fairytail.text.dto;

import lombok.Data;

@Data
public class TextDetailDto extends TextDto {

    private Integer likeCnt;

    private Boolean isLike;

}
