package com.fairytail.user.service;

import com.fairytail.user.dto.UserDto;
import com.fairytail.user.jpa.UserEntity;
import com.fairytail.user.jpa.UserRepository;
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
    public Integer saveFirebaseToken(UserDto userDto) {
        userRepository.findById(userDto.getUserId());
        return userRepository.updateFirebaseToken(userDto.getFirebaseToken(), userDto.getUserId());
    }

    @Override
    public Boolean findUser(Long userId) {
        Optional<UserEntity> userEntity = userRepository.findById(userId);
        return userEntity.isPresent() && userEntity.get().getStatus() != 1;
    }

    @Override
    public Integer updateAlert(Long userId) {
        // user block_cnt 증가
        int result = userRepository.updateBlockCnt(userId);

        // 3번일 경우 차단
        if(userRepository.findById(userId).get().getBlock_cnt() == 3) {
            userRepository.updateUserStatus(userId);
        }
        return result;
    }

    @Override
    public String getFirebaseToken(Long userId) {
        Optional<UserEntity> userEntity = userRepository.findById(userId);
        return modelMapper.map(userEntity.get(), UserDto.class).getFirebaseToken();
    }
}
