package com.fairytail.img.dto;

import lombok.Data;

@Data
public class NotiRequestDto {

    private String title;

    private String token;

    private NotiLikeRequestDto data;

}
