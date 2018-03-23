// 默认地址
const DEFAULT_ADDRESS = "/ws";

function websocket() {
	this.handler = new handler();
	this.socket = null;
	this.stompClient = null;
	// 连接
	this.connect = function() {
		console.log("Connecting...");
		this.socket = new SockJS("/ws");
		this.stompClient = Stomp.over(this.socket);
		this.stompClient.handler = this.handler;

		// 创建连接
		this.stompClient.connect({}, function() {
			console.log('Connected: ' + 'frame demo server.');
			var handler = this.handler;
			this.subscribe('/topic/send', function(data) {
				handler.socketMessageHandler(JSON.parse(data.body));
			});
		});
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

// websocket message handler
function handler() {
	this.socketMessageHandler = function(msg) {
		var cmd = msg.cmd;
		var pid = msg.playerId;
		switch (cmd) {
		case CHARACTER_STATUS['CREATE']:
			create(pid);
			break;
		default:
			if (pid == playerId) {
				// 自己的操作
				characters[no].status = cmd;
			} else {
				// 对方的操作
				var op = no == 'c1' ? 'c2' : 'c1'
				characters[op].status = cmd;
			}
			break;
		}
	}
}

function toJson(cmd) {
	var data = new Object();
	data.playerId = playerId;
	data.cmd = cmd;

	return JSON.stringify(data);
}
