package com.fairytail.like.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class WebSecurity extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests().antMatchers("/like/**").permitAll();

        /** h2 데이터베이스 조회 시, 프레임 엑스박스 현상 - 추후 삭제 예정 */
        http.headers().frameOptions().disable();
    }
}
