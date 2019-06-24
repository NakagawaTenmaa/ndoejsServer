'use strict';

// ログイン関数
//var loginScriot  = require('login.js');
// パケット
//var packetScrion = require("packet.js");
var crypto = require("crypto");
let now = new Date();
let lockpass = 'abcdef';


// 接続DB詳細
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ten',
  database : 'mmo_rpg'
});

// ユーザー作成のResponse
class CreateUserResponse{
	constructor(){
		this.command = 103;
		this.msg = "";
	}
};

// ログインしたときのResponse
class LoginUserResponse{
	constructor(){
		this.command = 104;
		this.msg = "";
	}
};

// wabソケットの設定
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
  port: 8000
});

//connection.connect();
wss.on('connection',function(ws) {
	ws.on('message',function(message){
		// 受信時
		let json = JSON.parse(message);
		// 送られてもの一覧	 => (pass , username)
		// ここでDB操作
		if(json.pass && json.username){
		console.log('データ受け付けました : ' + json.pass + json.username);
		// 作成
		if(json.command == 101){
			// ユーザーの作成
				let cipher = crypto.createCipher('aes192' , lockpass);
				cipher.update(json.pass,'utf8','hex');
				let pass  = cipher.final('hex');
				let today = Date.today();
				connection.query('INSERT INTO `users`(`user_name`,`password`) VALUES ("' + json.username +'","' + pass + '")',function(err , rows){
				// エラー確認
				if(err) {console.log('err : ' + err);}
			});
						// 終了
			//connection.end();
		} else if(json.command == 102){
				let cipher = crypto.createCipher('aes192' , lockpass);
				cipher.update(json.pass,'utf8','hex');
				let pass  = cipher.final('hex');
				var queryStr = 'SELECT `user_id`, `user_name`, `password` FROM `users` WHERE user_name = "' + json.username + '" AND password = "' + pass + '"';
			// ログイン
			// ユーザーの確認
			connection.query(queryStr,function(err , rows , fields){
				if(err) {console.log('err : ' + err );}
					let msg = new LoginUserResponse();
					try{						
						// 復号化
						var decipher = crypto.createDecipher('aes192', lockpass);
						decipher.update(rows[0].password, 'hex', 'utf8');
						var dec = decipher.final('utf8');
				    	if(dec == json.pass && rows[0].user_name){
						console.log("データが見つかりました");	
						msg.msg = "OK";
						let jsonStr = JSON.stringify(msg);
						ws.send(jsonStr);
						} else {console.log("データがありません");}
					} catch (e){
						console.log("データがありません");
						msg.msg = "NO";
						let jsonStr = JSON.stringify(msg);
						ws.send(jsonStr);
					}
				});
			}	
		}
	});
});
