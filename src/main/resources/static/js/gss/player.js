// player.js

// class player
function player(playerId, game) {
	this.imageX = 0;
	this.imageY = 0;
	this.left = 0;
	this.direction = 'right';
	this.playerId = playerId;
	this.jqObj = null;
	this.isDead = false;
	this.game = game;
	this.statusmachine = new statusmachine(this);
	this.animation = new animation(this);
	// initial
	this.init = function (direction='right', left=0, me='me') {
		// 界面上增加玩家
		this.direction = direction;
		this.left = left;
	    $('.content').append('<div class="player '+me+' '+this.direction+'" id="c'+this.playerId+'"></div>');
	    this.jqObj = $('#c'+this.playerId+'');
	    console.log(this.jqObj);
	    this.jqObj.css('left', this.left + 'px');
	    var me = this;
	    $(document).keydown(function(event){
	    	console.log(event.keyCode)
	    	if (!me.getJqObj().hasClass('me')) {
	    		return ;
	    	}
	    	switch(event.keyCode) {
	    		case 37:
	    			// to left
	    			me.direction = 'left';
	    			me.jqObj.removeClass('right').addClass('left');
		    		me.statusmachine.sendStatusChange(global.PLAYER_STATUS['RUN']);
	    			break;
	    		case 39:
	    			// to right
	    			me.direction = 'right';
	    			me.jqObj.removeClass('left').addClass('right');
		    		me.statusmachine.sendStatusChange(global.PLAYER_STATUS['RUN']);
	    			break;
	    		case 65:
		    		me.statusmachine.sendStatusChange(global.PLAYER_STATUS['ATTACK']);
	    			break;
	    	}
	    });
    };

    // 每一帧处理的逻辑
	this.update = function() {
//		this.statusmachine.update();
		this.animation.update();
	}

	this.updateStatus = function(newStatus) {
		// 真正修改状态的地方
		this.statusmachine.status = newStatus;
	}

	// get jquery object
	this.getJqObj = function() {
		return this.jqObj;
	}

	this.move = function() {
		if (this.direction == 'left') {
			if (this.left >= 16) {
				this.left -= 16;
			}
		} else {
			if (this.left <= 864) {
				this.left += 16;
			}
		}
		this.getJqObj().css('left', this.left + 'px');
	}
	
	this.random = function(min=0, max=1) {
		this.game.seed = (this.game.seed * 9301 + 49297) % 233280;
		var rnd = this.game.seed / 233280.0;
		return min + rnd * (max - min);
	}
	
	this.attack = function() {
		// 使用原生的随机函数生成的值序列不同
//		var damage = Math.random();
		// 需要自己重写一个
		var damage = this.random();
		$('.log').append('<div>'+this.playerId+' '+damage+'</div>');
	}
}