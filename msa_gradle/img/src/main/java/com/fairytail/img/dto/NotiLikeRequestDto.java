package com.fairytail.img.dto;

import lombok.Data;

@Data
public class NotiLikeRequestDto {

    private Long userId;

    private Long postId;

    private Integer emojiNo;

    private Integer type;

}
