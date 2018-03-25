// 默认地址
const DEFAULT_ADDRESS = "/ws";

function websocket(framecontroller) {
	this.handler = new handler();
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
			var handler = me.handler;
			this.subscribe('/topic/match', function(data) {
				alert(data.body);
//				handler.socketMessageHandler(JSON.parse(data.body));
			});
			console.log('Subscribed: /topic/match');
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
	
	// 订阅帧同步信息
	this.subscribe = function() {
		this.stompClient.subscribe('/topic/callback', function(data) {
//			handler.socketMessageHandler(JSON.parse(data.body));
			console.log(data.body);
		});
	}

}

// websocket message handler
function handler() {
	this.socketMessageHandler = function(msg) {
		var cmd = msg.cmd;
		var pid = msg.playerId;
		switch (cmd) {
		case PLAYER_STATUS['CREATE']:
			mygame.addPlayer(new player(pid));
			break;
		default:
			var p = mygame.getPlayerByPlayerId(pid);
			if (null != p){
				p.statusmachine.status = cmd;
			}
			break;
		}
	}
}

function toJson(cmd) {
	var data = new Object();
	data.playerId = 0;
	data.cmd = cmd;

	return JSON.stringify(data);
}
