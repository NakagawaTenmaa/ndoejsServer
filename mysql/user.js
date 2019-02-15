'use strict';

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql133.phy.lolipop.lan',
  user     : 'LAA0996731',
  database : 'LAA0996731-shooting'
});

// 接続開始
connection.connect();

/*
connection.query('SELECT * from user;',function(err , rows, fields){
	if(err) {console.log('err : ' + err);}

	console.log('highscore : ' + rows[0].highscore);
	console.log('name : ' + rows[0].name);
});
*/

// 接続終了
connection.end();


/*
connection.connect();
connection.end();
*/