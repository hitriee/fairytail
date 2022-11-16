package com.fairytail.text.dto;

import lombok.Data;

@Data
public class NotiRequestDto {

    private String title;

    private String token;

    private NotiLikeRequestDto data;

}
