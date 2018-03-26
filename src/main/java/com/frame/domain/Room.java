/*
 * $Header: Room.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月23日
 * $ModifyDate: 2018年3月23日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame.domain;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;

/**
 * Room.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
public class Room {
    
    private Player left;
    
    private Player right;
    
    private int num;
    
    private Map<Integer, List<String>> msgQueue = new ConcurrentHashMap<Integer, List<String>>();
    
    // 帧号
    private volatile int frameNo;
    
    private volatile boolean start = false;
    
    // 每一帧的逻辑
    public synchronized String tick() {
    	if (!this.start) {
    		return "";
    	}
    	List<String> queue = this.msgQueue.get(frameNo);
    	frameNo++;
    	this.msgQueue.put(frameNo, new LinkedList<String>());
    	return JSON.toJSONString(queue);
    }
    
    // 增加新的逻辑
    public synchronized void addMessage(String newMessage) {
    	if (!start) {
    		return ;
    	}
    	if (this.msgQueue.containsKey(this.frameNo)) {
    		this.msgQueue.get(this.frameNo).add(newMessage);
    	}
    }
    
    // 开始帧同步
    public void start() {
    	if (start) {
    		return ;
    	}
    	this.frameNo = 1;
    	this.msgQueue.put(this.frameNo, new LinkedList<String>());
    	this.start = true;
    }

    public Player getLeft() {
        return left;
    }
    
    public void incNum() {
    	this.num++;
    }

    public void setLeft(Player left) {
        this.left = left;
    }

    public Player getRight() {
        return right;
    }

    public void setRight(Player right) {
        this.right = right;
    }

	public int getFrameNo() {
		return frameNo;
	}

	public void setFrameNo(int frameNo) {
		this.frameNo = frameNo;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

}
