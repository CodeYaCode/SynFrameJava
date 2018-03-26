// game.js

function game() {
	this.me = null;
	this.players = [];
	this.seed = 5;
	this.framecontroller = new framecontroller(this);

	// initial
	this.init = function() {
		// 添加一个单机玩家
//		var np = new player(global.playerId, this);
//		np.init();
//		this.addPlayer(np);
		this.framecontroller.start(global.MODE['INTERVAL']);
		// 操作成功,打开websocket连接
		this.framecontroller.start(global.MODE['WEBSOCKET']);
		// 界面上的显示
	    $('.status').removeClass('red yellow').addClass('green').html('CONNECTING.');
	};

	// 添加玩家
	this.addPlayer = function(player) {
		if (null == player) {
			return ;
		}
		if (null == this.me) {
			this.me = player;
		}
		this.players.push(player);
	}
	
	// 根据玩家id查找玩家
	this.getPlayerByPlayerId = function(playerId) {
		var player = null;
		this.players.forEach(function(p) {
			if (p.playerId == playerId) {
				player = p;
				return player;
			}
		});
		return player;
	}

	// 每一帧更新
	this.update = function() {
		this.players.forEach(function(p) {
			p.update();
		});
	}
	
	// 加入房间
	this.join = function() {
		var obj = global.msg(global.OPERATION['MATCH'], global.MATCH['START']);
		var me = this;
		$.ajax({
			url: 'match',
			data: obj,
			type: 'POST',
			success: function(data) {
				data = $.parseJSON(data);
//				console.log(data);
				if (data.result == global.OPERATION_SUCCESS) {
					// 清空现有的玩家
					me.me = null;
					me.players = [];
				    global.playerId = parseInt(data.data);
				} else {
					alert('加入失败,renew一下');
				}
			}
		});
	}
	
	// 开始帧同步
	this.start = function() {
		if (this.players.length < 2) {
			return ;
		}
		// 开始订阅帧同步
		this.framecontroller.websocket.subscribeFrame();
		var me = this;
		$.ajax({
			url: 'start',
			data: obj,
			type: 'POST',
			success: function(data) {
				me.stop();
			}
		});
	}

	// 重置房间
	this.renew = function() {
		var obj = global.msg(global.OPERATION['MATCH'], global.MATCH['RENEW']);
		$.ajax({
			url: 'match',
			data: obj,
			type: 'POST',
			success: function(data) {
				console.log($.parseJSON(data));
			}
		});
	}

	this.stop = function() {
		this.framecontroller.stop();
	}
	
	this.clear = function() {
		this.me = null;
		this.players = [];
		$('.player').remove();
	}
}