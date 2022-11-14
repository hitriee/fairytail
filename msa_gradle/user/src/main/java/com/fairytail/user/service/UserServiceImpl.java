package com.fairytail.user.service;

import com.fairytail.user.dto.UserDto;
import com.fairytail.user.jpa.UserEntity;
import com.fairytail.user.jpa.UserRepository;
import com.fairytail.user.vo.RequestFirebase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Override
    public UserDto saveFirebaseToken(UserDto userDto) {
        userRepository.findById(userDto.getUserId());
        return modelMapper.map(userRepository.save(modelMapper.map(userDto, UserEntity.class)), UserDto.class);
    }
}
