/*
package com.fairytail.gateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    @Value("${token.secret}")
    private String token_secret;

    public AuthorizationHeaderFilter() {
        super(Config.class);
    }

    */
/**
     * Spring 5 부터는 ServletHttpRequest와 ServletHttpResponse 를 더이상 지원하지 않는다.
     * SPring 5 부터는 WebFlux를 지원하기 때문에 ServerHttpRequest, ServerHttpResponse를 지원한다.
     *
     * 로그인 후 토큰 반환 -> 로그인 이외의 서비스를 요청하고자 할 때, 토큰 정보를 가지고 온다. -> header(토큰이 포함되어있다)
     * *//*



    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            // API 요청시 Header에 로그인 했을 때 토큰을 전달해주는 역할을 할 것
            ServerHttpRequest request = exchange.getRequest();

            // Header에 토큰 있는지 확인
            if(!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return tokenError(exchange, "No Authorization Header", HttpStatus.UNAUTHORIZED);
            }

            // 배열이 되기 때문에 0번째의 데이터를 가져온다. - Bearer Token
            String authorizationHeader = request.getHeaders().get(org.springframework.http.HttpHeaders.AUTHORIZATION).get(0);
            String jwt = authorizationHeader.replace("Bearer ", ""); // Bearer를 제외한 나머지 토큰

            // 이용가능한 토큰인지를 확인
            if(!isValidJwt(jwt)) {
                return tokenError(exchange, "JWT token is unavailable", HttpStatus.UNAUTHORIZED);
            }

            return chain.filter(exchange);
        });
    }

    private boolean isValidJwt(String jwt) {
        boolean returnValue = true;

        Claims subject = null;

        try {
            // JWT parsing
            subject = Jwts.parser()
                    .setSigningKey(token_secret)
                    .parseClaimsJws(jwt).getBody();
            System.out.println("********************subject***********************" + subject);
        } catch (Exception e) {
            returnValue = false;
        }

        if(subject.isEmpty()) {
            returnValue = false;
        }

        return returnValue;
    }

    */
/**
     * 토큰 정보가 유효하지 않거나 토큰이 없을 때, 에러 메시지 반환
     * WebFlux에서 데이터를 처리하는 단위 중 하나가 Mono - 단일 값
                                           단일 값이 아닐 경우 Flux
     *//*

    private Mono<Void> tokenError(ServerWebExchange exchange, String errorMessage, HttpStatus statusCode) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(statusCode);

        log.error(errorMessage);
        return response.setComplete();
    }

    public static class Config {
        // configuration 정보가 필요할 시 추가할 것
    }

}
*/
