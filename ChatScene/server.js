'use strict';

class ChatRequest{
	constructor(){
		this.command = 201;
		this.msg = "";
	}
}

class ChatResponse{
	constructor(){
		this.command = 202;
		this.msg = "";
	}
}

// wabソケットの設定
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
  port: 8001
});

wss.on('connection',function(ws) {
	// 受信時
	ws.on('message',function(message){
		let json = JSON.parse(message);
		if(json.command == 201){
			
			console.log("受信メッセージ : "  + json.msg);
			// 全てのClientに送信			
			wss.clients.forEach(function(client){
				let msgData = new ChatResponse();
				msgData.msg = json.msg;
				client.send(JSON.stringify(msgData));
				console.log("送信メッセージ : " msgData.msg);
			});
		}
	});
});