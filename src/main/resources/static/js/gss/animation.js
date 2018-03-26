//animation.js

function animation(player) {
	this.player = player;
	
	this.update = function() {
		switch(this.player.statusmachine.oldStatus) {
		case global.PLAYER_STATUS['IDLE']:
			this.idel();
			break;
		case global.PLAYER_STATUS['RUN']:
			this.run();
			break;
		case global.PLAYER_STATUS['ATTACK']:
			this.attack();
			break;
		case global.PLAYER_STATUS['DEAD']:
			this.dead();
			break;
		default:
			console.log('Unsupported status.')
			break;
		}
	}

	// 空闲状态
	this.idel = function() {
		this.animation(0, -160, 0);
	}

	// 奔跑状态
	this.run = function() {
		this.animation(0, -160, -160);
	}

	// 攻击状态
	this.attack = function() {
		this.animation(0, -480, -80);
	}

	// 死亡状态
	this.dead = function() {
		this.animation(0, -400, -240);
	}

	// 播放一帧动画
	this.animation = function(imageXStart, imageXEnd, imageY) {
		// 移动到下一帧动画
		this.player.imageX -= 80;
//		if (this.oldStatus != this.status) {
//			// 改变状态了，动画重头开始
//			this.player.imageX = 0;
//			this.oldStatus = this.status;
//		}
		if (this.player.imageX <= imageXEnd) {
			// 放完了，状态变为idle
			this.player.statusmachine.oldStatus = global.PLAYER_STATUS['IDLE'];
			this.player.imageX = 0;
		}
		this.player.imageY = imageY;
	    this.player.getJqObj().css('background-position', this.player.imageX + 'px ' + this.player.imageY + 'px');
	    if (this.player.statusmachine.oldStatus == global.PLAYER_STATUS['RUN']) {
	    	this.player.move();
	    }
	}
}