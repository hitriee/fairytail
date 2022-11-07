package com.fairytail.user.service;

import com.fairytail.user.jpa.UserEntity;
import com.fairytail.user.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

/**
 * auth 2.0을 통해 사용자 로그인이 완료되었을 경우 이후 과정을 담당하는 서비스
 * 회원 가입 및 정보 수정, 세션 저장 등의 기능을 제공
 * */
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest)
            throws OAuth2AuthenticationException {

        /** DefaultOAUth2UserService: userRequest를 load 하여 user 정보를 획득해올 수 있다 */
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate =
                new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // registrationId: 현재 로그인 진행 중인 서비스
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        // OAUth2 로그인 진행 시 필드가 되는 값 - 구글의 기본 코드는 "sub", 네이버/카카오 지원 X - Primary Key
        String userNameAttributeName = userRequest.getClientRegistration()
                                                    .getProviderDetails()
                                                    .getUserInfoEndpoint()
                                                    .getUserNameAttributeName();

        // User 정보 획득하기
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Optional<UserEntity> user = userRepository.findByEmail((String) attributes.get("email"));

        // 사용자가 존재하지 않는다면 사용자 임의 등록
        if(user == null || user.isEmpty()) {
            String email = (String) attributes.get("email");
            String username = (String) attributes.get("name");
            UserEntity newUser = userRepository.save(UserEntity.builder()
                    .email(email).username(username).build());
        }

        return new DefaultOAuth2User(Collections.singleton(
                new SimpleGrantedAuthority("ROLE_USER")), attributes, userNameAttributeName);
    }
}
