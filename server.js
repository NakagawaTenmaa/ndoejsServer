class Player{
	constructor(){
		this.id = Math.floor(Math.random()*1000000000);
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}

	// 移動処理
	move(distance){

	}
};

let players = {};


const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
  port: 8080
});

wss.on('connection',function(ws) {
	let player = null;
	// 受信時
		ws.on('message',function(message){
		console.log('received: %s', message);
		// プレイヤーの作成
		player = new Player();
		players[player.id] = player;

		wss.clients.forEach(function(client){
			client.send(message);
		});
	});
});
