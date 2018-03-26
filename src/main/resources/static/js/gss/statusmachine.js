// statusmachine.js

function statusmachine(player) {
	this.player = player;
	this.status = global.PLAYER_STATUS['IDLE'];
//	this.oldStatus = global.PLAYER_STATUS['IDLE'];

	this.sendStatusChange = function(newStatus) {
		if (this.canChangeStatus(newStatus)) {
//			this.status = newStatus;
			var obj = global.msg(global.OPERATION['PLAYER_STATUS'], newStatus);
			switch(newStatus) {
			case global.PLAYER_STATUS['RUN']:
				obj.direction = this.player.direction;
				break;
			case global.PLAYER_STATUS['IDLE']:
				break;
			case global.PLAYER_STATUS['ATTACK']:
				break;
			case global.PLAYER_STATUS['DEAD']:
				break;
			default:
				console.log('Unsupported status.')
				break;
			}
			this.player.game.framecontroller.websocket.send('/app/send', JSON.stringify(obj));
		}
	}
	
	this.canChangeStatus = function(newStatus) {
		if (this.status == global.PLAYER_STATUS['RUN']) {
			return newStatus == global.PLAYER_STATUS['RUN'];
		}
		return this.status == global.PLAYER_STATUS['IDLE'];
	}
}