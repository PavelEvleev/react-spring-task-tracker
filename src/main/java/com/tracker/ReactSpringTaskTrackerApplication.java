package com.tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class ReactSpringTaskTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReactSpringTaskTrackerApplication.class, args);
	}
}
