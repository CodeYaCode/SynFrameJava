/*
 * $Header: FrontMessage.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月23日
 * $ModifyDate: 2018年3月23日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame.messageDto;

/**
 * FrontMessage.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
public class Message {
    /**
     * playerId
     */
    private int playerId;
    /**
     * command
     */
    private int cmd;
    public int getPlayerId() {
        return playerId;
    }
    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }
    public int getCmd() {
        return cmd;
    }
    public void setCmd(int cmd) {
        this.cmd = cmd;
    }
}
