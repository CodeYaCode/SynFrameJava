// game.js

function game() {
	this.me = null;
	this.players = [];
	this.framecontroller = new framecontroller(this);

	// initial
	this.init = function() {
		// 添加一个单机玩家
		var np = new player(0);
		np.init();
		this.addPlayer(np);
		this.framecontroller.start(global.MODE['INTERVAL']);
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
		if (this.players.length >= 2) {
			this.start();
		}
	}
	
	// 根据玩家id查找玩家
	this.getPlayerByPlayerId = function(playerId) {
		var player = null;
		this.players.forEach(function(p) {
			if (p.playerId == playerId) {
				player = p;
				return ;
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

	this.start = function() {
		global.playerId = $('#playerId').val();
		var obj = global.msg(global.OPERATION['MATCH'], global.MATCH['START']);
		var me = this;
		$.ajax({
			url: 'match',
			data: obj,
			type: 'POST',
			success: function(data) {
				data = $.parseJSON(data);
				console.log(data);
				if (data.result == global.OPERATION_SUCCESS) {
					// 清空现有的玩家
					me.me = null;
					me.players = [];
					$('.player').remove();
					// 操作成功,打开socket连接
					me.framecontroller.start(global.MODE['WEBSOCKET']);
					// 界面上的显示
				    $('.status').removeClass('red yellow').addClass('green').html('CONNECTING.');
					if (data.data == 0) {
						// 左边玩家
						var p = new player(global.playerId);
						p.init();
						me.addPlayer(p);
					} else if (data.data == 1) {
						// 右边玩家
						var p = new player(global.playerId);
						p.init('left', 620);
						me.addPlayer(p);
					} else {// 不存在的
					}
//				    $(this).after('<div class="hpbar"></div>');
				} else {
					alert('加入失败,renew一下或者改个id');
				}
			}
		});
	}

	this.stop = function() {
		this.framecontroller.stop();
	}

	this.renew = function() {
		global.playerId = $('#playerId').val();
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
}