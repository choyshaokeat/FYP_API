const db = require("../api/db.js");
var encdec = require('../function/encdec');
var moment = require('moment');

var dbFYP = db.dbFYP;

// Student Info
module.exports.login = function login(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    var query = `
      SELECT *
      FROM adminInfo 
      WHERE 
          adminEmail = '${data.adminEmail}' 
      AND 
          adminPW = '${data.adminPW}'`;
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
    if (data.type == "bookingStatus") {
      var query = `
        UPDATE studentInfo
        SET 
        bookingStatus = "${data.bookingStatus}"
        WHERE studentID = "${data.studentID}"
        `;
    } else if (data.type == "updateRoomInfo") {
      var query = `
        UPDATE studentInfo
        SET 
        bookingStatus = "2",
        roomNumber = "${data.roomNumber}",
        bed = "${data.bed}"
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
    studentID = '${data.studentID}' AND bookingStatus = 0
    `;
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.getAdminInfo = function getAdminInfo(data) {
  return new Promise((resolve, reject) => {
    var query = `
    SELECT *
    FROM adminInfo
    WHERE 
    adminID = '${data.adminID}'
    `;
    console.log(query);
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
    } else if (data.type == "currentRoommates") {
      var query = `
      SELECT A.studentName, A.studentContact, A.studentEmail, B.bed
      FROM studentInfo A
      INNER JOIN bookingHistory B
      ON A.studentID = B.studentID
      WHERE 
      B.roomNumber = '${data.roomNumber}' AND (B.status = 'Checked-in' OR B.status = 'Booked')
      ORDER BY B.bed
      `;
    } else if (data.type == "count") {
      var query = `
      SELECT COUNT(studentID) AS bookingHistoryCount
      FROM bookingHistory
      WHERE studentID = '${data.studentID}'
      `;
    }
    //console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.updateBookingInfo = function updateBookingInfo(data) {
  return new Promise((resolve, reject) => {
    if (data.type == "createBookingHistory") {
      var query = `
      INSERT INTO bookingHistory
      (studentID, roomNumber, village, block, level, bed, aircond, fees, status, checkInDate, checkOutDate, numberOfSemester)
      VALUES
      ("${data.studentID}","${data.roomNumber}","${data.village}", "${data.block}", "${data.level}", "${data.bed}",
      "${data.aircond}","${data.fees}","${data.status}", "${data.checkInDate}", "${data.checkOutDate}", "${data.numberOfSemester}")
      `;
    }
    //console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.getRoomInfo = function getRoomInfo(data) {
  return new Promise((resolve, reject) => {
    if (data.type == "getVillage") {
      var query = `
      SELECT distinct village
      FROM roomInfo
      WHERE genderAllowed = "${data.gender}"
      ORDER BY village ASC
      `;
    } else if (data.type == "getBuilding") {
      var query = `
      SELECT distinct block
      FROM roomInfo
      WHERE village = "${data.village}" AND genderAllowed = "${data.gender}"
      ORDER BY block ASC
      `;
    } else if (data.type == "getRoom") {
      var query = `
      SELECT *
      FROM roomInfo
      WHERE status <= '1' AND village = "${data.village}" AND block = "${data.block}" AND genderAllowed = "${data.gender}"
      ORDER BY roomNumber, bed ASC
      `;
    } else if (data.type == "filterRoom") {
      var query = `
      SELECT *
      FROM roomInfo
      WHERE status <= '1' AND village = "${data.village}" AND block = "${data.block}" AND capacity = "${data.capacity}" AND genderAllowed = "${data.gender}"
      ORDER BY roomNumber, bed ASC
      `;
    } else if (data.type == "getRoomCapacity") {
      var query = `
      SELECT distinct capacity
      FROM roomInfo
      WHERE village = "${data.village}" AND block = "${data.block}" AND genderAllowed = "${data.gender}"
      ORDER BY capacity ASC
      `;
    } else if (data.type == "getMinRoomCapacity") {
      var query = `
      SELECT distinct MIN(capacity) AS capacity
      FROM roomInfo
      WHERE genderAllowed = "${data.gender}"
      `;
    } else if (data.type == "getMaxRoomCapacity") {
      var query = `
      SELECT distinct MAX(capacity) AS capacity
      FROM roomInfo
      WHERE genderAllowed = "${data.gender}"
      `;
    } else if (data.type == "checkRoomAvailability") {
      var query = `
      SELECT status
      FROM roomInfo
      WHERE roomNumber = "${data.roomNumber}" AND bed = "${data.bed}"
      `;
    } else if (data.type == "getAllVillage") {
      var query = `
      SELECT distinct village
      FROM roomInfo
      ORDER BY village ASC
      `;
    } else if (data.type == "getAllRoomCapacity") {
      var query = `
      SELECT distinct capacity
      FROM roomInfo
      ORDER BY capacity ASC
      `;
    } else if (data.type == "getAllRoom") {
      var query = `
      SELECT *
      FROM roomInfo
      ORDER BY roomNumber, bed ASC
      `;
    } else if (data.type == "filterAllRoom") {
      var query = `
      SELECT *
      FROM roomInfo
      WHERE village = "${data.village}" AND genderAllowed = "${data.gender}" AND capacity = "${data.capacity}"
      ORDER BY roomNumber, bed ASC
      `;
    }
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.updateRoomInfo = function updateRoomInfo(data) {
  return new Promise((resolve, reject) => {
    if (data.type == "updateRoomInfo") {
      var query = `
      UPDATE roomInfo
      SET status = "1"
      WHERE roomNumber = "${data.roomNumber}" AND bed = "${data.bed}"
      `;
    } else if (data.type == "updateCurrentCapacity") {
      var query = `
      UPDATE roomInfo
      SET currentCapacity = currentCapacity - 1
      WHERE roomNumber = "${data.roomNumber}"
      `;
    } else if (data.type == "addRoom") {
      var query = `
      INSERT INTO roomInfo(roomNumber, village, block, level, bed, aircond, price, capacity, genderAllowed, status)
      VALUES("${data.roomNumber}", "${data.village}", "${data.building}", "${data.level}", "${data.bed}",
      "${data.aircond}", "${data.price}", "${data.capacity}", "${data.gender}", "${data.status}")
      `;
    } else if (data.type == "deleteRoom") {
      var query = `
      DELETE FROM roomInfo
      WHERE roomNumber = "${data.roomNumber}"
      `;
    } else if (data.type == "editRoom") {
      var query = `
      UPDATE roomInfo
      SET
      aircond = "${data.aircond}",
      price = "${data.price}",
      genderAllowed = "${data.gender}",
      status = "${data.status}"
      WHERE roomNumber = "${data.roomNumber}"
      `;
    } 
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}