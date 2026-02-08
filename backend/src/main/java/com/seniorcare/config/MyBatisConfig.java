package com.seniorcare.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.seniorcare.domain.*.mapper")
public class MyBatisConfig {
}
