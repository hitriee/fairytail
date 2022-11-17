package com.fairytail.user.service;

import com.fairytail.user.dto.UserDto;

public interface UserService {
    Integer saveFirebaseToken(UserDto userDto);
    Boolean findUser(Long userId);
    Integer updateAlert(Long userId);

    Boolean isValidToken(String token);

}
