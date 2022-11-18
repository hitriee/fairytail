package com.fairytail.user.service;

import com.fairytail.user.dto.UserDto;
import com.fairytail.user.jpa.UserEntity;
import com.fairytail.user.jpa.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Resource
    private Environment env;

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

    @Override
    public Boolean isValidToken(String token) {
        log.debug("token++++++++++++++++++++++++++", token);
        Claims jwtBody = parseJWT(token.replace("Bearer ", ""));
        Date now = new Date();
        log.debug("time__________________________" + jwtBody.getExpiration());
        return now.before(jwtBody.getExpiration());
    }

    private Claims parseJWT(String token) {
        Key key = Keys.hmacShaKeyFor(Objects.requireNonNull(env.getProperty("token.secret")).getBytes(StandardCharsets.UTF_8));
        return Jwts.parserBuilder().setSigningKey(key)
                .build().parseClaimsJws(token).getBody();
    }

}
