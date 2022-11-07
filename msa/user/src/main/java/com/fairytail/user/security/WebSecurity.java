package com.fairytail.user.security;

import com.fairytail.user.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor

public class WebSecurity extends WebSecurityConfigurerAdapter  {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.httpBasic().disable()
                .csrf().disable()
                .sessionManagement() // session 정보를 따로 저장하지 않음 - 토큰으로 관리하기 위함
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                .anyRequest().permitAll();
//                .hasIpAddress("")   TODO: 통과시키고 싶은 IP 주소 - 내부 IP만 접근 가능하도록 추후 설정 필요

        /**
         * 구글 로그인 연동
         * 사용자 로그인 성공 시, successHandler를 사용하여 사용자를 임의 등록 혹은 로그인 진행을 하고, jwt 토큰을 응답으로 제공할 수 있다.
         *
         * 사용자 로그인 성공 시, service를 사용하여 사용자를 임의 등록 혹은 로그인을 진행할 수 있다. */
        http.oauth2Login()
                .userInfoEndpoint() // 로그인 성공 후 사용자 정보를 가져온다.
                .userService(customOAuth2UserService) // 가져온 사용자 정보를 처리할 때 사용한다.
                .and()
                .successHandler(oAuth2SuccessHandler);

        /** TODO: h2 데이터베이스 조회 시, 프레임 엑스박스 현상 - 추후 삭제 예정 */
        http.headers().frameOptions().disable();
    }
}
