package com.davidgomez.miportafoliomusical;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.davidgomez.miportafoliomusical.model")
public class MiPortafolioMusicalApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiPortafolioMusicalApplication.class, args);
	}

}
