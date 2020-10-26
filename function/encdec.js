var CryptoJS = require("crypto-js");

var p_key = {
  login: 'key_login.bbb',
  client: 'key_client.bbb',
  admin: 'key_admin.bbb',
  mail: 'key_mail.bbb'
}

function encryptObject(type, value) {
  try {
    var key = '';
    if (type == 'login') key = p_key.login;
    else if (type == 'client') key = p_key.client;
    else if (type == 'admin') key = p_key.admin;
    else if (type == 'mail') key = p_key.mail;

    var b64 = CryptoJS.AES.encrypt(JSON.stringify(value), key).toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var encrypted = e64.toString(CryptoJS.enc.Hex);
    return encrypted;
  } catch (err) {
    console.log(err)
    return 'Error - encrypt';
  }
}

function decryptObject(type, value) {
  try {
    var key = '';
    if (type == 'login') key = p_key.login;
    else if (type == 'client') key = p_key.client;
    else if (type == 'admin') key = p_key.admin;
    else if (type == 'mail') key = p_key.mail;

    var reb64 = CryptoJS.enc.Hex.parse(value);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, key);
    var decrypted = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
    return decrypted;
  } catch (err) {
    return 'Error - decrypt';
  }
}

function encodeObjectBase64(type, value) {
  try {
    var key = '';
    if (type == 'client') key = p_key.client;

    var encode = CryptoJS.AES.encrypt(JSON.stringify(value), key).toString();
    return encode;
  } catch (err) {
    return 'Error - encrypt';
  }
}

function decodeObjectBase64(type, value) {
  try {
    var key = '';
    if (type == 'client') key = p_key.client;
    var decode = CryptoJS.AES.decrypt(value, key);
    decode = CryptoJS.enc.Utf8.stringify(decode)

    return decode;
  } catch (err) {
    return 'Error - decode';
  }
}

module.exports.encryptObject = encryptObject;
module.exports.decryptObject = decryptObject;
module.exports.encodeObjectBase64 = encodeObjectBase64;
module.exports.decodeObjectBase64 = decodeObjectBase64;