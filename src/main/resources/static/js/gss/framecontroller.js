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
			if (null != this.interval) {
				clearInterval(this.intervalId);
			}
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
}