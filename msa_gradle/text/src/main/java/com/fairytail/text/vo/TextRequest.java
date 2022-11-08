package com.fairytail.text.vo;

import lombok.Data;

@Data
public class TextRequest {

    private Integer emojiNo;

    private String title;

    private Integer type;

    private String content;

    private Float lat;

    private Float lng;

    private Integer status;

}
