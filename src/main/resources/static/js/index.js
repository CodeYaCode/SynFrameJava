// index.js
var websock;
// 生成一个随机的playerId
var playerId = Math.random();
$('.playerId').attr('data-id', playerId);
// 自己在游戏中的no
var no;

$(document).ready(function() {
    // websocket连接
	websock = new websocket();
	websock.connect();
});

$('#start').click(function() {
    if (websock != undefined) {
        var data = toJson(-1);
        websock.send('/app/send', data);
    }
});
