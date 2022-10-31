package com.example.testcloud.Service;

import com.example.testcloud.DTO.UserDto;
import org.springframework.stereotype.Service;


public interface UserService {
    void createUser(UserDto userDto);
}
