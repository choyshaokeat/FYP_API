var encdec = require('./function/encdec');
const db = require("./api/db.js");

var dbFYP = db.dbFYP;

// time for insert only
module.exports.getTime_UTC = function getTime_UTC() {
    return new Promise((resolve, reject) => {
        var query = `
            SELECT UTC_TIMESTAMP(6) as currentTime
        `;
        dbFYP.query(query, function (err, snapshot) {
            if (err) return reject(err.sqlMessage);
            resolve(snapshot);
        });
    });
}

// time for display at frontEnd
module.exports.getTime_UTC_8 = function getTime_UTC_8() {
    return new Promise((resolve, reject) => {
        var query = `
            SELECT CONVERT_TZ(UTC_TIMESTAMP(6),'+00:00','+08:00') as currentTime
        `;
        dbFYP.query(query, function (err, snapshot) {
            if (err) return reject(err.sqlMessage);
            resolve(snapshot);
        });
    });
}

module.exports.query = function query(query) {
    return new Promise((resolve, reject) => {
        dbFYP.query(query, function (err, snapshot) {
            if (err) return reject(err.sqlMessage);
            resolve(snapshot);
        });
    });
}

module.exports.QR_redirect = function QR_redirect(res, data, type) {
    var url = 'http://localhost:4200';
    if (type == 'order') {
        data = encdec.encryptObject('merchant', data);
        url = `${url}/restaurant_menu/${data}`;
    }
    else if (type == 'reservation') {
        data = encdec.encryptObject('reservation', data);
        url = `${url}/shop/${data}`;
    }
    else if (type == 'login') {
        if (data.redirectTo == 'order') {
            var encrypted = encdec.encryptObject('merchant', data);
            data.redirectTo = `/restaurant_menu/${encrypted}`;
        }
        else if (data.redirectTo == 'reservation') {
            var encrypted = encdec.encryptObject('reservation', data);
            data.redirectTo = `/shop/${encrypted}`;
        }
        data = encdec.encryptObject('login', data);
        url = `${url}/login?value=${data}`;
    }

    // return res.json({
    //     'message': 'Feel free to add query parameters to the end of the url',
    //     'queryObject': url
    // });

    return res.redirect(url);
}

module.exports.loading = function loading() {
    const server = http.createServer((req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
    });
}

module.exports.Encode = function Encode(res, data, key) {
    var result = encdec.encryptObject(key, data);
    return res.json(result);
}

module.exports.redirect = function redirect(res, url) {
    // var url = 'http://localhost:4200';
    // url = `${url}/${data}`;
    return res.redirect(url);
}

module.exports.solved = function solved(res, data, key) {
    var result = {
        status: 200,
        data: data
    };
    result = encdec.encryptObject(key, result);
    return res.json(result);
}

module.exports.error = function error(res, err, message) {
    return res.json({
        status: 500,
        err: err,
        message: message
    });
}