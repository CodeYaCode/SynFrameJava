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
		// 创建连接
		this.stompClient.connect({}, function() {
			// setConnected(true);
			console.log('Connected: ' + 'frame demo server.');
			this.subscribe('/topic/send', function(greeting) {
				console.log(JSON.parse(greeting.body).content);
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
function handler(msg) {
	this.socketMessageHandler = function() {
		var data = $.parseJSON(m);
		var cmd = data.cmd;
		var pid = data.playerId;
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
