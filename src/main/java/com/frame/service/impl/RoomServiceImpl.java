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

import com.frame.constants.FrameConstant;
import com.frame.constants.MatchConstant;
import com.frame.data.RoomProcessor;
import com.frame.messageDto.Message;
import com.frame.service.IRoomService;

/**
 * RoomServiceImpl.java
 * @author LiuChen
 * @version 1.0.0.0 2018年3月23日
 */
@Service
public class RoomServiceImpl implements IRoomService {

	/* (non-Javadoc)
	 * @see com.frame.service.RoomService#doMatch(com.frame.messageDto.Message)
	 */
	@Override
	public String doMatch(Message message) {
		if (message.getOp() == FrameConstant.OPERATION_MATCH) {
			// 是操作相关
			switch(message.getCmd()) {
				case MatchConstant.MATCH_OPERATION_START:
					int result = RoomProcessor.getInstance().addNewPlayer();
					if (result == -1) {
						return FrameConstant.getOperationResult(message, FrameConstant.OPERATION_FAIL, "");
					} else {
					    // 设置一下playerId
						return FrameConstant.getOperationResult(message, FrameConstant.OPERATION_SUCCESS, String.valueOf(result));
					}
				case MatchConstant.MATCH_OPERATION_RENEW:
					RoomProcessor.getInstance().renewRoom();
					return FrameConstant.getOperationResult(message, FrameConstant.OPERATION_SUCCESS, "");
			}
		}
		return FrameConstant.getOperationResult(message, FrameConstant.OPERATION_UNSUPPORT, "OPERATION_UNSUPPORT");
	}

}
