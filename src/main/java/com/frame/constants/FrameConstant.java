package com.frame.constants;

import com.alibaba.fastjson.JSON;
import com.frame.messageDto.Message;
import com.frame.messageDto.OperationMessage;

/**
 *
 * @author LiuChen
 *
 */
public class FrameConstant {

	// 帧频
//	public final static int FRMAE_INTERVAL = 1000 / 30;
    public final static int FRMAE_INTERVAL = 1000 / 1;
	
	// ----------------------------- OPERATION ----------------------------- //
	// 比赛相关操作类别码
	public final static int OPERATION_MATCH = 1;
	// 玩家状态变化类别码
	public final static int OPERATION_PLAYER_STATUS = 2;

	// ----------------------------- OPERATION RESULT ----------------------------- //
	// 不支持的操作
	public final static int OPERATION_UNSUPPORT = -1;
	// 操作成功
	public final static int OPERATION_SUCCESS = 1;
	// 操作失败
	public final static int OPERATION_FAIL = 0;
	
	public static String getOperationResult(Message message, int result, String data) {
		return JSON.toJSONString(new OperationMessage()
				.result(result)
				.op(message.getOp())
				.cmd(message.getCmd())
				.data(data));
	}
}
