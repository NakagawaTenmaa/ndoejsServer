'use strict';

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ten',
  database : 'nodejs_mmo'
});

// 接続開始
connection.connect();

connection.query('SELECT * from users;',function(err , rows, fields){
	if(err) {console.log('err : ' + err);}

	console.log('posx : ' + rows[0].user_id);
	console.log('posy : ' + rows[0].user_name);
	console.log('posy : ' + rows[0].password);
	
});


// 接続終了
connection.end();


var crypto = require("crypto");


// 暗号化
let planeText = 'testCord';
let passowrd = 'abcdef';

console.log('text : ' + planeText);
console.log('pass : ' + passowrd);

let cipher = crypto.createCipher('aes192' , passowrd);
cipher.update(planeText,'utf8','hex');
let cipheredText = cipher.final('hex');

console.log('暗号化(AES192) : ' + cipheredText);


// 復号化
var decipher = crypto.createDecipher('aes192', passowrd);
decipher.update(cipheredText, 'hex', 'utf8');
var dec = decipher.final('utf8');

console.log('復号化(AES192) : ' + dec);



/*
connection.connect();
connection.end();
*/