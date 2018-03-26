// framecontroller.js

function framecontroller(game) {
	this.game = game;
	this.intervalId = null;
	this.websocket = new websocket(this);
	this.tick = function() {
		game.update();
	}

	this.start = function(mode, callback) {
		if (mode == global.MODE['WEBSOCKET']) {
			var me = this;
			me.websocket.connect(function() {
				callback();
			});
		} else if (mode == global.MODE['INTERVAL']) {
			this.intervalId = this.interval();
		} else {
			console.error('unsupport mode.');
		}
	}

	// 向后端发送数据
	this.send = function(path, msg) {
		this.websocket.send(path, msg);
	}

	this.stop = function() {
		if (null != this.intervalId) {
			clearInterval(this.intervalId);
		}
	}

	this.interval = function() {
		var tick = this.tick;
		return setInterval(function() {
			tick();
		}, 1000 / global.FPS);
	}

	// 玩家状态处理
	this.playerStatusHandler = function(msg) {
		var cmd = msg.cmd;
		var pid = msg.playerId;
		var p = mygame.getPlayerByPlayerId(pid);
		if (null != p) {
			p.statusmachine.status = cmd;
		}
	}
	
	// match handler
	this.matchHandler = function(msg) {
		msg = JSON.parse(msg);
		console.log(msg);
		// 清除数据，重新构建
		this.game.clear();
		if (msg.left != null && msg.left.playerId == global.playerId) {
			// 我是左边玩家
			var np = new player(global.playerId, this.game);
			np.init('right', 30, 'me');
			this.game.addPlayer(np);
			if (msg.right != null) {
				// 对手
				var np = new player(msg.right.playerId, this.game);
				np.init('left', 770, '');
				this.game.addPlayer(np);
			}
		} else if(msg.right != null && msg.right.playerId == global.playerId) {
			// 我是右边玩家
			if (msg.left != null) {
				// 需要先判断左边玩家，不然位置会有问题
				// 对手
				var np = new player(msg.left.playerId, this.game);
				np.init('right', 30, '');
				this.game.addPlayer(np);
			}
			var np = new player(global.playerId, this.game);
			np.init('left', 770, 'me');
			this.game.addPlayer(np);
		}
	}
	
	// frame handler
	this.frameHandler = function(msg) {
		if (null != msg && msg != '' && msg != 'null') {
			msg = JSON.parse(msg);
			for (var i = 0; i < msg.length; i++) {
				var data = $.parseJSON(msg[i]);
				if (null != data) {
					var p = this.game.getPlayerByPlayerId(data.playerId);
					if (null != p) {
						console.log(data);
//						p.statusmachine.status = data.cmd;
						if (data.cmd == global.PLAYER_STATUS['RUN']) {
			    			p.direction = data.direction;
			    			p.getJqObj().removeClass('right left').addClass(data.direction);
						}
						// 同步状态
			    		p.updateStatus(data.cmd);
					}
				}
			}
		}
		// 帧驱动动画
		this.tick();
	}
	
}