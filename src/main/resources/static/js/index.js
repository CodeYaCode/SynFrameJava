// index.js
// var websock;
const gsspath = '../static/js/gss'
const renderingpath = '../static/js/rendering'
// import some *.js
document.write('<script type="text/javascript" src="'+gsspath+'/global.js"></script>');
document.write('<script type="text/javascript" src="'+gsspath+'/websocket.js"></script>');
document.write('<script type="text/javascript" src="'+gsspath+'/game.js"></script>');
document.write('<script type="text/javascript" src="'+gsspath+'/player.js"></script>');
document.write('<script type="text/javascript" src="'+gsspath+'/statusmachine.js"></script>');
document.write('<script type="text/javascript" src="'+gsspath+'/framecontroller.js"></script>');
document.write('<script type="text/javascript" src="'+renderingpath+'/animation.js"></script>');

$(document).ready(function() {
	// 创建游戏
	var mygame = new game();
	mygame.init();
	var playerId = null;
	
	$('.join').click(function() {
		// join room
		mygame.join();
	});

	$('.start').click(function() {
		// start game
		mygame.start();
	});

	$('.renew').click(function() {
		// renew room
		mygame.renew();
	});
	


	$('#run').click(function() {
		mygame.framecontroller.websocket.subscribe();
//		g.me.updateStatus(PLAYER_STATUS['RUN']);
		// for (key in characters) {
		// 	var c = characters[key];
		// 	c.status = CHARACTER_STATUS['RUN'];
		// };
		// if (conn != undefined) {
		// 	var data = toJson(CHARACTER_STATUS['RUN']);
		// 	console.log("send: ", data);
		// 	conn.send(data);
		// }
	});
});

// ---------- TEST ---------- //
$('#start').click(function() {
	websock.connect();
    $('.status').removeClass('red yellow').addClass('green').html('CONNECTING.');
});

$('#stop').click(function() {
    // if (websock != undefined) {
    //     var data = toJson(-1);
    //     websock.send('/app/send', data);
    // }
    $('.status').removeClass('green yellow').addClass('red').html('DISCONNECTED.');
});

$('#idle').click(function() {
	var obj = {};
	obj.playerId = $('#playerId').val();
	obj.cmd = -1;
	websock.send('/app/send', JSON.stringify(obj));
	// g.me.updateStatus(PLAYER_STATUS['IDLE']);
//    $('.status').removeClass('green red').addClass('yellow').html('CROWDED.');
//	g.me.move();
	// for (key in characters) {
	// 	var c = characters[key];
	// 	c.status = PLAYER_STATUS['IDLE'];
	// };
	// if (conn != undefined) {
	// 	var data = toJson(PLAYER_STATUS['IDLE']);
	// 	console.log("send: ", data);
	// 	conn.send(data);
	// }
});

$('#attack').click(function() {
	var obj = {};
	obj.playerId = $('#playerId').val();
	obj.cmd = PLAYER_STATUS['ATTACK'];
	websock.send('/app/send', JSON.stringify(obj));
//	mygame.me.updateStatus(PLAYER_STATUS['ATTACK']);
	// for (key in characters) {
	// 	var c = characters[key];
	// 	c.status = PLAYER_STATUS['ATTACK'];
	// };
	// if (conn != undefined) {
	// 	var data = toJson(PLAYER_STATUS['ATTACK']);
	// 	console.log("send: ", data);
	// 	conn.send(data);
	// }
});

$('#dead').click(function() {
	g.me.updateStatus(PLAYER_STATUS['DEAD']);
	// for (key in characters) {
	// 	var c = characters[key];
	// 	c.status = PLAYER_STATUS['DEAD'];
	// };
	// if (conn != undefined) {
	// 	var data = toJson(PLAYER_STATUS['DEAD']);
	// 	console.log("send: ", data);
	// 	conn.send(data);
	// }
});