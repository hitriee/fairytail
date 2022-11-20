package com.fairytail.text;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class TextApplication {

	public static void main(String[] args) {
		SpringApplication.run(TextApplication.class, args);
	}

}
