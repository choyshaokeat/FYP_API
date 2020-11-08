const db = require("../api/db.js");
var encdec = require('../function/encdec');
var moment = require('moment');

var dbFYP = db.dbFYP;
module.exports.getBookingDocument = function getBookingDocument() {
  return new Promise((resolve, reject) => {
    var query = `
    SELECT *
    FROM bookingDocument
    `;
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.getAllStudentEmail = function getAllStudentEmail() {
  return new Promise((resolve, reject) => {
    var query = `
    SELECT studentEmail
    FROM studentInfo
    `;
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.setBookingDocument = function setBookingDocument() {
  return new Promise((resolve, reject) => {
    var query = `
    UPDATE bookingDocument
    SET 
    roomStatus = "1"
    WHERE id = 0
    `;
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}