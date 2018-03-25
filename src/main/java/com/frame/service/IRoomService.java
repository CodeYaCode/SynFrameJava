/*
 * $Header: RoomService.java
 * $Revision: 1.0.0.0
 * $CreateDate: 2018年3月23日
 * $ModifyDate: 2018年3月23日
 * $Owner: LiuChen
 * 
 * Copyright (c) 2017-2027 ShangHai ChenJxx Co. Ltd.
 * All Right Reserved.
 */
package com.frame.service;

import com.frame.messageDto.Message;

/**
 * RoomService.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
public interface IRoomService {

	/**
	 * 处理比赛相关逻辑
	 * @param message
	 * @return
	 */
	public String doMatch(Message message);
}
