var crypto_js = require("crypto-js");
var bcrypt = require("bcrypt");

var salt_num = null;
var hash_num = null;

// 暗号化
function encryption(_key){
	var str = "trident";
	var dec = crypto_js.AES.encrypt(str,_key);
	console.log(dec.toString());
	return dec;
};

// 複合化
function composite(_str,_key){
	var decrypted = crypto_js.AES.decrypt(_str.toString(), _key);
	console.log(decrypted.toString(crypto_js.enc.Utf8));
}

function hashing(_str,_salt){
	// ハッシュ化
	bcrypt.hash(_str, _salt, function(err, hash) {
	    console.log(hash);
	});
}


function hashing_rand(_str){
	bcrypt.genSalt(10, function(err, salt) {		
		bcrypt.hash(_str, salt, function(err, hash) {
	    	// ここでDB保存その先どうするか・・・・
	    	console.log('hash : ' + hash);
	    	console.log('salt : ' + salt);
	    });
	});
}

function hash_save(_hash,_salt){
	hash_num = _hash;
	salt_num = _salt;
}

function hashing_reverse(_hash){
	console.log(hash_num);
	console.log(salt_num);
}


/*
// 暗号化
var enc = encryption("123");
// 複合化
composite(enc,"123");
*/


//hashing('trident',8);
hashing_rand('trident');