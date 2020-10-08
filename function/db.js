require('dotenv').config();

const mysql = require('mysql');

module.exports.connect = function connect(db) {
    // console.log(db);
    var database = mysql.createPool({
        multipleStatements: true,
        connectionLimit: 100,
        host    : process.env.DB_HOST,
        user    : process.env.DB_USER,
        password: process.env.DB_PASS,
        port    : process.env.DB_PORT,
        database: db,
        timezone: 'utc'
    });
    return database;
}