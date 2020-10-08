const db = require("../api/db.js");
var encdec = require('../function/encdec');
var moment = require('moment');

var dbFYP = db.dbFYP;

// Student Info
module.exports.registerClient = function registerClient(data) {
  return new Promise((resolve, reject) => {
    var query = `
        INSERT INTO studentInfo SET ?
        `;
    dbFYP.query(query, data, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.registerCheck = function registerCheck(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    var query = `
        SELECT COUNT(studentEmail) AS count
        FROM studentInfo
        WHERE
        studentEmail = '${data.studentEmail}' 
        `;

    dbFYP.query(query, data, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.login = function login(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    var query = `
      SELECT *
      FROM studentInfo 
      WHERE 
          studentEmail = '${data.studentEmail}' 
      AND 
          studentPW = '${data.studentPW}'`;
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.updateStudentInfo = function updateStudentInfo(data) {
  return new Promise((resolve, reject) => {
    console.log(data);
    if (data.type == "password") {
      var query = `
        UPDATE studentInfo
        SET
            studentPW = "${data.studentPW}"
        WHERE studentID = "${data.studentID}" AND studentEmail = "${data.studentEmail}"
        `;
    } else if (data.type == "info") {
      var query = `
        UPDATE studentInfo
        SET 
            studentName = "${data.studentName}",
            studentEmail = "${data.studentEmail}",
            studentContact = "${data.studentContact}",
            studentAddress = "${data.studentAddress}"
        WHERE studentID = "${data.studentID}"
        `;
    }
    //console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.getStudentInfo = function getStudentInfo(data) {
  return new Promise((resolve, reject) => {
    var query = `
      SELECT *
      FROM studentInfo
      WHERE 
        studentID = '${data.studentID}'
      `;
    //console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.getBookingInfo = function getBookingInfo(data) {
  return new Promise((resolve, reject) => {
    if (data.type == "bookingHistory") {
      var query = `
      SELECT *
      FROM bookingHistory
      WHERE 
      studentID = '${data.studentID}'
      ORDER BY UNIX_TIMESTAMP(checkInDate) DESC
      `;
    }
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}