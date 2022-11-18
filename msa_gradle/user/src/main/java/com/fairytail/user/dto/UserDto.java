package com.fairytail.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserDto {
    Long userId;
    String email;
    String username;
    String firebaseToken;
    Integer block_cnt;
    Integer status;
}
