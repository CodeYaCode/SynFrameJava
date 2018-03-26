// 默认地址
const DEFAULT_ADDRESS = "/ws";

function websocket(framecontroller) {
	this.socket = null;
	this.stompClient = null;
	this.framecontroller = framecontroller;
	this.isconnected = false;
	// 连接
	this.connect = function() {
		if (this.isconnected) {
			console.log('Already connected.');
			return ;
		}
		console.log("Connecting...");
		this.socket = new SockJS("/ws");
		this.stompClient = Stomp.over(this.socket);
		var me = this;
		// 创建连接
		this.stompClient.connect({}, function() {
			console.log('Connected: frame demo server.');
			me.isconnected = true;
			var framecontroller = me.framecontroller;
			this.subscribe('/topic/match', function(data) {
				framecontroller.matchHandler(data.body);
			});
			console.log('Subscribed: /topic/match');
		});
	}
	
	this.subscribeFrame = function() {
		// 订阅帧同步信息
		var me = this;
		this.stompClient.subscribe('/topic/frame', function(data) {
//			console.log
			me.framecontroller.frameHandler(data.body);
		});
		console.log('Subscribed: /topic/frame');
	}
	
	// 断开连接
	function disconnect() {
		if (stompClient !== null) {
			stompClient.disconnect();
		}
		// setConnected(false);
		console.log("Disconnected");
	}

	// 发送消息
	this.send = function(path, msg) {
		if (this.stompClient != null) {
			console.log('send msg[', msg, ']');
			this.stompClient.send(path, {}, msg);
		} else {
			console.error("<b>WebSocket doesn't connected.</b>");
		}
	}
	
}

function toJson(cmd) {
	var data = new Object();
	data.playerId = 0;
	data.cmd = cmd;

	return JSON.stringify(data);
}
