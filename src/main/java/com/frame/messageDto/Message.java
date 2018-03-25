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
     * operation
     */
    protected int op;
    /**
     * command
     */
    protected int cmd;
    /**
     * key frame
     */
    private boolean key;
    
    public Message playerId(int playerId) {
    	this.playerId = playerId;
    	return this;
    }
    
    public Message op(int op) {
    	this.op = op;
    	return this;
    }
    
    public Message cmd(int cmd) {
    	this.cmd = cmd;
    	return this;
    }
    
    public int getPlayerId() {
        return playerId;
    }
    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }
    public int getOp() {
		return op;
	}
	public void setOp(int op) {
		this.op = op;
	}
	public int getCmd() {
        return cmd;
    }
    public void setCmd(int cmd) {
        this.cmd = cmd;
    }
	public boolean isKey() {
		return key;
	}
	public void setKey(boolean key) {
		this.key = key;
	}
	@Override
	public String toString() {
		return "Message [playerId=" + playerId + ", op=" + op + ", cmd=" + cmd + ", key=" + key + "]";
	}
}
