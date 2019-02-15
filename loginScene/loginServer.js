'use strict';

// ログイン関数
//var loginScriot  = require("login.js");
// パケット
//var packetScrion = require("packet.js");



// wabソケットの設定
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
  port: 8000
});

wss.on('connection',function(ws) {

	ws.on('message',function(message){
		// 受信時
		var json = JSON.parse(message);
		// 送られてもの一覧	 => (pass , username)
		// ここでDB操作
		if(json.pass && json.username){
			console.log('データ受け付けました : ' + json.pass + json.username);
		}
	});
});
