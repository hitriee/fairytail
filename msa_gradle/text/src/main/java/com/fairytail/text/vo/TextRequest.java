package com.fairytail.text.vo;

import lombok.Data;

@Data
public class TextRequest {

    private Integer emojiNo;

    private String title;

    private Integer type;

    private String content;

    private Double lat;

    private Double lng;

    private Integer status;

    private Long userId;

}
