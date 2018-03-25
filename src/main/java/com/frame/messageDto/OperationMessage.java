package com.frame.messageDto;

/**
 *
 * @author LiuChen
 *
 */
public class OperationMessage extends Message {

	/**
	 * 操作结果
	 */
	private int result;
	
	/**
	 * 具体内容
	 */
	private String data;
	
	public OperationMessage result(int result) {
		this.result = result;
		return this;
	}
	
	public OperationMessage op(int op) {
		this.op = op;
		return this;
	}
	
	public OperationMessage cmd(int cmd) {
		this.cmd = cmd;
		return this;
	}
	
	public OperationMessage data(String data) {
		this.data = data;
		return this;
	}

	public int getResult() {
		return result;
	}

	public void setResult(int result) {
		this.result = result;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "OperationMessage [result=" + result + ", op=" + op + ", cmd=" + cmd + ", data=" + data + "]";
	}

}
