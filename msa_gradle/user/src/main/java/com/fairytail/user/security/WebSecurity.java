package com.fairytail.user.security;

import com.fairytail.user.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurity extends  WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.httpBasic().disable()
                .csrf().disable();
        // session 정보를 따로 저장하지 않음 - 토큰으로 관리하기 위함
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // 모든 요청에 관한 허가 - 권한 허가
        http.authorizeRequests()
                .anyRequest().permitAll();
//                .hasIpAddress("")   TODO: 통과시키고 싶은 IP 주소 - 내부 IP만 접근 가능하도록 추후 설정 필요

        /**
         * 구글 로그인 연동
         * 사용자 로그인 성공 시, successHandler를 사용하여 사용자를 임의 등록 혹은 로그인 진행을 하고, jwt 토큰을 응답으로 제공할 수 있다.
         * 사용자 로그인 성공 시, service를 사용하여 사용자를 임의 등록 혹은 로그인을 진행할 수 있다. 이후 successHandler에서 jwt 토큰을 응답으로 제공한다. */

        http.oauth2Login()
                .userInfoEndpoint()                     // 로그인 성공 후 사용자 정보를 가져온다.
                .userService(customOAuth2UserService)   // 가져온 사용자 정보를 처리(등록 혹은 로딩)할 때 사용한다.
                .and()
                .successHandler(oAuth2SuccessHandler);  // JWT - access token을 발행한다. 따로 refresh 토큰을 발급하지는 않고 단일 access token만을 사용한다.

        /** h2 데이터베이스 조회 시, 프레임 엑스박스 현상 해결 - 삭제
        http.headers().frameOptions().disable(); */
    }
}
