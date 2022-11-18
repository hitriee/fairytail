package com.fairytail.user.service;

import com.fairytail.user.dto.UserDto;

public interface UserService {
    UserDto saveFirebaseToken(UserDto userDto);
}
