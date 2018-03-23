// character.js
const CHARACTER_STATUS = {
	'CREATE': -1,
	'IDLE':   0,
	'RUN':    1,
	'ATTACK': 2,
	'DEAD':   3
}

const FPS = 8;
// 管理所有玩家的容器
var characters = {};

// -------------------- 页面加载后执行 --------------------- //
$(document).ready(function() {
	// 初始化所有角色
	var cs = $('.character');
	cs.each(function() {
		characters[$(this).attr('id')] = new Character($(this));
	});
	// 动画主循环
    setInterval(function() {
	    update();
    }, 1000 / FPS);
});

function create(pid) {
	no = pid == playerId ? 'c1' : 'c2';
	console.log(pid, playerId);
    $('.content').append('<div class="character" id="'+no+'"></div>');
    console.log($('#'+no));
	characters[no] = new Character($('#'+no));
}

// 每一帧的更新
function update() {
	for (key in characters) {
		var c = characters[key];
		console.log(c.status);
		statusMachine(c.status, c);
	};
}

// 状态机
function statusMachine(s, c) {
	switch(s) {
		case CHARACTER_STATUS['IDLE']:
			idle(s, c);
			break;
		case CHARACTER_STATUS['RUN']:
			run(s, c);
			break;
		case CHARACTER_STATUS['ATTACK']:
			attack(s, c);
			break;
		case CHARACTER_STATUS['DEAD']:
			dead(s, c);
			break;
		default:
			console.log('Unsupported status.')
			break;
	}
}

// 空闲状态
function idle(s, c) {
	animation(s, c, 0, -160, 0);
}

// 奔跑状态
function run(s, c) {
	animation(s, c, 0, -160, -160);
}

// 攻击状态
function attack(s, c) {
	animation(s, c, 0, -480, -80);
}

// 死亡状态
function dead(s, c) {
	animation(s, c, 0, -400, -240);
}

// 播放一帧动画
function animation(s, c, xStart, xEnd, y) {
	// 移动到下一帧动画
	c.x -= 80;
	if (c.oldStatus != s) {
		// 改变状态了，动画重头开始
		c.x = 0;
		c.oldStatus = s;
	}
	if (c.x <= xEnd) {
		// 放完了，状态变为idle
		c.status = CHARACTER_STATUS['IDLE'];
		c.x = 0;
	}
	c.y = y;
    c.jqObj.css('background-position', c.x + 'px ' + c.y + 'px');
}

// class character
function Character(c) {
	this.x = 0;
	this.y = 0;
	this.status = CHARACTER_STATUS['IDLE'];
	this.oldStatus = CHARACTER_STATUS['IDLE'];
	this.jqObj = c;
	this.isDead = false;

	this.toString = function() {
		return this.jqObj;
	}
}

// ---------- TEST ---------- //
$('#idle').click(function() {
	// for (key in characters) {
	// 	var c = characters[key];
	// 	c.status = CHARACTER_STATUS['IDLE'];
	// };
	if (conn != undefined) {
		var data = toJson(CHARACTER_STATUS['IDLE']);
		console.log("send: ", data);
		conn.send(data);
	}
});

$('#run').click(function() {
	// for (key in characters) {
	// 	var c = characters[key];
	// 	c.status = CHARACTER_STATUS['RUN'];
	// };
	if (conn != undefined) {
		var data = toJson(CHARACTER_STATUS['RUN']);
		console.log("send: ", data);
		conn.send(data);
	}
});

$('#attack').click(function() {
	// for (key in characters) {
	// 	var c = characters[key];
	// 	c.status = CHARACTER_STATUS['ATTACK'];
	// };
	if (conn != undefined) {
		var data = toJson(CHARACTER_STATUS['ATTACK']);
		console.log("send: ", data);
		conn.send(data);
	}
});

$('#dead').click(function() {
	// for (key in characters) {
	// 	var c = characters[key];
	// 	c.status = CHARACTER_STATUS['DEAD'];
	// };
	if (conn != undefined) {
		var data = toJson(CHARACTER_STATUS['DEAD']);
		console.log("send: ", data);
		conn.send(data);
	}
});