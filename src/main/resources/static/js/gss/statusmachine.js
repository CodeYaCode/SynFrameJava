// statusmachine.js

function statusmachine(player) {
	this.player = player;
	this.status = global.PLAYER_STATUS['IDLE'];
	this.oldStatus = global.PLAYER_STATUS['IDLE'];

	this.updateStatus = function(newStatus) {
		if (this.canChangeStatus(newStatus)) {
			this.oldStatus = newStatus;

			var obj = global.msg(global.OPERATION['PLAYER_STATUS'], newStatus);
			switch(this.oldStatus) {
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
		return this.oldStatus == global.PLAYER_STATUS['IDLE'];
	}
}