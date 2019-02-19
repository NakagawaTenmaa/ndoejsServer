'use strict';

// 接続DB詳細
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'my',
  database : 'nodejs_mmo'
});

// ユーザーの作成
function InsertUser(username , pass)
{
	// 接続開始
	connection.connect();

	connection.query('INSERT INTO users (user_name,password) VALUES ("' + "name" + '",' + "pass" + '")',function(err , rows, fields){
		// エラー確認
		if(err) {console.log('err : ' + err);}
	});
	// 終了
	connection.end();
};

// ユーザー登録の確認
function SearchUser()
{
	// 接続開始
	connection.connect();
	connection.query('SELECT * from user',function(err , rows , fields) {
		// エラー確認
		if(err){console.log('err : ' + err);}
	});
	// 終了
	connection.end();

};