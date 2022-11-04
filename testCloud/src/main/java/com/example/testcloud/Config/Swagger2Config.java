package com.example.testcloud.Config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Swagger2Config {
    @Bean
    public OpenAPI springShowOpenAPI(){
        return new OpenAPI()
                .info(new Info().title("test")
                .description("test 프로젝트")
                .version("v0.0.1"));
    }
}

