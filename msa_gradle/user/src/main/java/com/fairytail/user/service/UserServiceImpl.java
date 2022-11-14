package com.fairytail.user.service;

import com.fairytail.user.dto.UserDto;
import com.fairytail.user.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Override
    public Integer saveFirebaseToken(UserDto userDto) {
        userRepository.findById(userDto.getUserId());
        return userRepository.updateFirebaseToken(userDto.getFirebaseToken(), userDto.getUserId());
    }
}
