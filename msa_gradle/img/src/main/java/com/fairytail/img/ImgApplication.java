package com.fairytail.img;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ImgApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImgApplication.class, args);
	}

}
