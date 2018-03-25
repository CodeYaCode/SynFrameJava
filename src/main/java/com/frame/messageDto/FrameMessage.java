package com.frame.messageDto;

import java.util.List;

/**
 *
 * @author LiuChen
 *
 */
public class FrameMessage {
	/**
	 * 帧号
	 */
	private int frameNo;
	
	/**
	 * 帧信息
	 */
	private List<Message> msgs;

	public int getFrameNo() {
		return frameNo;
	}

	public void setFrameNo(int frameNo) {
		this.frameNo = frameNo;
	}

	public List<Message> getMsgs() {
		return msgs;
	}

	public void setMsgs(List<Message> msgs) {
		this.msgs = msgs;
	}
}
