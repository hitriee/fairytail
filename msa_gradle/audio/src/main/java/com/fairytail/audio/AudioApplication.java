package com.fairytail.audio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
//import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class AudioApplication {

	public static void main(String[] args) {
		SpringApplication.run(AudioApplication.class, args);
	}

}
