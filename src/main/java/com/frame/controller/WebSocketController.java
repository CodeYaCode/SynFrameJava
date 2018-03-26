/*
 * $Header: WebSocketController.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月23日
 * $ModifyDate: 2018年3月23日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import com.frame.constants.FrameConstant;
import com.frame.data.RoomProcessor;

/**
 * WebSocketController.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/send")
    public void send(String message) throws Exception {
    	System.out.println("message: " + message);
    	RoomProcessor.getInstance().getRoom().addMessage(message);
    }

    @Scheduled(fixedRate = FrameConstant.FRMAE_INTERVAL)
    public void callback() throws Exception {
        // 发现消息
        messagingTemplate.convertAndSend("/topic/frame", RoomProcessor.getInstance().getRoom().tick());
    }
    
}
