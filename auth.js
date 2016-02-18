var crypto = require('crypto');
var config = require('./config').password;

function encrypt(data) {
  var sha = crypto.createHash(config.algorithm);
  var gen = sha.update(data).digest(config.digest);
  return gen;
}

exports.encrypt = encrypt;
