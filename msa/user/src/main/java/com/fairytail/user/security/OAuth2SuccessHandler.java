package com.fairytail.user.security;

import com.fairytail.user.jpa.UserEntity;
import com.fairytail.user.jpa.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Component
@Log4j2
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Resource
    private Environment env;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) (DefaultOAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttributes().get("email").toString();
        Optional<UserEntity> user = userRepository.findByEmail(email);

        // JWT - access token 만들기
        String token = "";
        if(!user.isEmpty()) {
            token = Jwts.builder()
                    .setSubject(email)
                    .setExpiration(new Date(System.currentTimeMillis() +
                            Long.parseLong(env.getProperty("token.expiration_time"))))
                    .signWith(SignatureAlgorithm.HS512, env.getProperty("token.secret")).compact();
        }

        response.addHeader("token", token);
        response.addHeader("userId", String.valueOf(user.get().getId()));
        log.info("token----------------------" + token);
    }
}
