package com.fairytail.user.vo;

import lombok.Data;

@Data
public class RequestFirebase {
    Long userId;
    String firebaseToken;
}
