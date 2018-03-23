/*
 * $Header: App.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月23日
 * $ModifyDate: 2018年3月23日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Controller;

/**
 * App.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
@Controller
@EnableScheduling
@SpringBootApplication(scanBasePackages = "com.frame")
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}
