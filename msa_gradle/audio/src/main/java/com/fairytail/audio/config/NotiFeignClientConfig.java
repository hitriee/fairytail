package com.fairytail.audio.config;

import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NotiFeignClientConfig {

    @Bean
    Logger.Level NotiFeignClientLoggerLevel() {
        return Logger.Level.FULL;
    }

}
