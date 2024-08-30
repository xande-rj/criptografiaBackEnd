var CryptoJS = require("crypto-js");
require('dotenv').config()

function decrypt(name) {
  let mysecret =process.env.MySecret;
  var bytes = CryptoJS.AES.decrypt(ciphertext, mysecret);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
}
module.exports = decrypt;
