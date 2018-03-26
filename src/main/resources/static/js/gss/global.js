// global.js
/*
	存放全局变量
*/
global = {}

// default playerId = 2
global.playerId = 2

// setInterval params
global.FPS = 8;
global.MODE = {
	'WEBSOCKET': 0,
	'INTERVAL' : 1
}

// operation
// success
global.OPERATION_SUCCESS = 1
// fail
global.OPERATION_FAIL = 0

global.OPERATION = {
	'MATCH': 1,
	'PLAYER_STATUS' : 2,
}

// match
global.MATCH = {
	'START': 1,
	'RENEW': 2,
}

// player status
global.PLAYER_STATUS = {
	'IDLE':   0,
	'RUN':    1,
	'ATTACK': 2,
	'DEAD':   3
}

global.msg = function(op, cmd) {
	obj = {}
	obj.playerId = this.playerId;
	obj.op = op;
	obj.cmd = cmd;
	return obj;
}