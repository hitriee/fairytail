package com.fairytail.user.service;

import com.fairytail.user.dto.UserDto;

public interface UserService {
    Integer saveFirebaseToken(UserDto userDto);
}
