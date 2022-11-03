package com.example.testcloud.Service.Impl;

import com.example.testcloud.DTO.UserDto;
import com.example.testcloud.Mapper.UserMapper;
import com.example.testcloud.Repository.UserRepository;
import com.example.testcloud.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private UserMapper userMapper;
    private UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @Override
    public void createUser(UserDto userDto) {

    }
}
