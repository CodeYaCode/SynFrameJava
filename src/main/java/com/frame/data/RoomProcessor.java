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
    
    private WebSocketMessageUtil webSocketMessageUtil;

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
    
    public void setWebSocketMessageUtil(WebSocketMessageUtil webSocketMessageUtil) {
        this.webSocketMessageUtil = webSocketMessageUtil;
    }
    
    /**
     * 添加新玩家
     * @param playerId
     * @return
     */
    public int addNewPlayer() {
        int result = -1;
    	if (this.room.getNum() == 0) {
            this.room.setLeft(new Player(PlayerConstant.LEFT_PLAYER_ID));
            this.room.incNum();
            result = PlayerConstant.LEFT_PLAYER_ID;
    	} else if (this.room.getNum() == 1) {
            this.room.setRight(new Player(PlayerConstant.RIGHT_PLAYER_ID));
            this.room.incNum();
            result = PlayerConstant.RIGHT_PLAYER_ID;
    	}
    	try {
    	    webSocketMessageUtil.pushRoomInfo();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    	return result;
    }
    
    /**
     * 重新创建房间
     */
    public void renewRoom() {
        this.room = new Room();
    }
}
