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
    public boolean addNewPlayer(int playerId) {
        if (playerId == PlayerConstant.LEFT_PLAYER_ID) {
            if (null != this.room.getLeft()) {
                // 已经有左边玩家了
                return false;
            }
            this.room.setLeft(new Player(playerId));
            return true;
        } else if (playerId == PlayerConstant.RIGHT_PLAYER_ID) {
            if (null != this.room.getRight()) {
                // 已经有右边玩家了
                return false;
            }
            this.room.setRight(new Player(playerId));
            return true;
        }
        return false;
    }
    
    /**
     * 重新创建房间
     */
    public void renewRoom() {
        this.room = new Room();
    }
}
