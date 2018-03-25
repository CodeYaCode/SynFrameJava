/*
 * $Header: RoomProcessor.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月23日
 * $ModifyDate: 2018年3月23日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame.data;

import com.frame.constants.PlayerConstant;
import com.frame.domain.Player;
import com.frame.domain.Room;

/**
 * RoomProcessor.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
public class RoomProcessor {
    private Room room;

    private static RoomProcessor instance = new RoomProcessor();
    
    private RoomProcessor() {
        this.room = new Room();
    }
    
    public static RoomProcessor getInstance() {
        return instance;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
    
    /**
     * 添加新玩家
     * @param playerId
     * @return
     */
    public int addNewPlayer(int playerId) {
    	if (this.room.getNum() == 0) {
            this.room.setLeft(new Player(playerId));
            this.room.incNum();
            return PlayerConstant.LEFT_PLAYER;
    	} else if (this.room.getNum() == 1 && this.room.getLeft().getPlayerId() != playerId) {
            this.room.setLeft(new Player(playerId));
            this.room.incNum();
            return PlayerConstant.RIGHT_PLAYER;
    	}
    	return -1;
    }
    
    /**
     * 重新创建房间
     */
    public void renewRoom() {
        this.room = new Room();
    }
}
