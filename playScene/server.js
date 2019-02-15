
// プレイヤークラス
var playerScript = require("player.js");


let players = {};



const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
  port: 8080
});

wss.on('connection',function(ws) {
	let player = null;
	player = new Player();
	players[player.id] = player;

	// 入室
	wss.clients.forEach(function(client){
		client.send(JSON.stringify(player));
	});


		// 受信時
		ws.on('message',function(message){
		//console.log('received: %s', message);
		var json = JSON.parse(message);
		
		if(!players[player.id]){
			// Idの中身がない時強制終了
			return;
		}

		// サーバー側でのデータ管理用		
		players[json.id].x = json.position.x;
		players[json.id].y = json.position.y;
		players[json.id].z = json.position.z;

		wss.clients.forEach(function(client){
			client.send(JSON.stringify(players[player.id]));
		});


	});
});
