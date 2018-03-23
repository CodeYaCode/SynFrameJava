/*
 * $Header: RoomServiceImpl.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月23日
 * $ModifyDate: 2018年3月23日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame.service.impl;

import org.springframework.stereotype.Service;

import com.frame.data.RoomProcessor;
import com.frame.service.RoomService;

/**
 * RoomServiceImpl.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
@Service
public class RoomServiceImpl implements RoomService {

    @Override
    public boolean addNewPlayer(int playerId) {
        return RoomProcessor.getInstance().addNewPlayer(playerId);
    }

}
