// player.js

// class player
function player(playerId) {
	this.imageX = 0;
	this.imageY = 0;
	this.left = 0;
	this.direction = 'right';
	this.playerId = playerId;
	this.jqObj = null;
	this.isDead = false;
	this.statusmachine = new statusmachine(this);
	// initial
	this.init = function (direction, left) {
		// 界面上增加玩家
		this.direction = direction;
		this.left = left;
	    $('.content').append('<div class="player me '+this.direction+'"></div>');
	    $('.me').css('left', this.left + 'px');
	    var me = this;
	    $(document).keydown(function(event){
	    	console.log(event.keyCode)
	    	switch(event.keyCode) {
	    		case 37:
	    			// to left
	    			me.direction = 'left';
	    			$('.me').removeClass('right').addClass('left');
		    		me.statusmachine.status = global.PLAYER_STATUS['RUN'];
	    			break;
	    		case 39:
	    			// to right
	    			me.direction = 'right';
	    			$('.me').removeClass('left').addClass('right');
		    		me.statusmachine.status = global.PLAYER_STATUS['RUN'];
	    			break;
	    		case 65:
		    		me.statusmachine.status = global.PLAYER_STATUS['ATTACK'];
	    			break;
	    	}
	    });
    };

	this.update = function() {
		this.statusmachine.update();
	}

	this.updateStatus = function(newStatus) {
		this.statusmachine.status = newStatus;
	}

	// get jquery object
	this.getJqObj = function() {
		if (null == this.jqObj) {
			this.jqObj = $('.me');
		}
		return this.jqObj;
	}

	this.move = function() {
		if (this.direction == 'left') {
			if (this.left >= 8) {
				this.left -= 8;
			}
		} else {
			if (this.left <= 872) {
				this.left += 8;
			}
		}
		this.getJqObj().css('left', this.left + 'px');
	}
}