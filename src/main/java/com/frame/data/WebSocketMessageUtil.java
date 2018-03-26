/*
 * $Header: WebSocketMessageUtil.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月26日
 * $ModifyDate: 2018年3月26日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame.data;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;

/**
 * WebSocketMessageUtil.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月26日
 */
@Component
public class WebSocketMessageUtil implements InitializingBean {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void pushRoomInfo() throws Exception {
        // 发现消息
        messagingTemplate.convertAndSend("/topic/match", JSON.toJSON(RoomProcessor.getInstance().getRoom()));
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        RoomProcessor.getInstance().setWebSocketMessageUtil(this);
    }
}
