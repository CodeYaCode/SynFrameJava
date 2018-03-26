/*
 * $Header: IndexController.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月23日
 * $ModifyDate: 2018年3月23日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frame.data.RoomProcessor;
import com.frame.messageDto.Message;
import com.frame.service.IRoomService;

/**
 * IndexController.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
@Controller
public class IndexController {
    @Autowired
    private IRoomService roomService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/match")
    @ResponseBody
    public String match(HttpServletRequest request) throws Exception {
    	Message message = new Message();
    	message.playerId(Integer.parseInt(request.getParameter("playerId")))
    		.op(Integer.parseInt(request.getParameter("op")))
    		.cmd(Integer.parseInt(request.getParameter("cmd")));
    	System.out.println(String.format("New ajax[%s]", message.toString()));
    	return roomService.doMatch(message);
    }
    
    @PostMapping("/start")
    @ResponseBody
    public void start(HttpServletRequest request) throws Exception {
    	RoomProcessor.getInstance().getRoom().start();
    	System.out.println(String.format("New ajax[%s]", "start"));
    }
    
}
