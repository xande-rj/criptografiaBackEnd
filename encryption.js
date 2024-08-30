var CryptoJS = require("crypto-js");
require('dotenv').config()

function encryption(text) {
  let mysecret = process.env.MySecret;
  var ciphertext = CryptoJS.AES.encrypt(text, mysecret).toString();
  return ciphertext;
}

module.exports = encryption;
