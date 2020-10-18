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
    } else if (data.type == "bookingStatus") {
      var query = `
        UPDATE studentInfo
        SET 
        bookingStatus = "${data.bookingStatus}"
        WHERE studentID = "${data.studentID}"
        `;
    } else if (data.type == "vrCode") {
      var query = `
        UPDATE studentInfo
        SET 
        vrCode = "${data.vrCode}"
        WHERE studentID = "${data.studentID}"
        `;
    } else if (data.type == "deleteVR") {
      var query = `
        UPDATE studentInfo
        SET 
        bookingStatus = "0",
        vrCode = NULL
        WHERE vrCode = "${data.vrCode}"
        `;
    } else if (data.type == "updateRoomInfo") {
      var query = `
        UPDATE studentInfo
        SET 
        bookingStatus = "2",
        roomNumber = "${data.roomNumber}",
        bed = "${data.bed}",
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
    if (data.type == "getVRRoommates") {
      var query = `
      SELECT *
      FROM studentInfo
      WHERE 
        vrCode = '${data.vrCode}' AND studentID != '${data.vrHost}'
      `;
    } else {
      var query = `
      SELECT *
      FROM studentInfo
      WHERE 
        studentID = '${data.studentID}'
      `;
    }
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
      A.roomNumber = '${data.roomNumber}' AND B.status = 'Checked-in'
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

module.exports.getVirtualRoom = function getVirtualRoom(data) {
  return new Promise((resolve, reject) => {
    if (data.type == "roomAvailablityCheck") {
      var query = `
      SELECT COUNT(${data.vrCode}) AS count
      FROM virtualRoom
      WHERE vrCode = '${data.vrCode}' AND vrStatus = '0'
      `;
    } else if (data.type == "capacityCheck") {
      var query = `
      SELECT vrCapacity, currentCapacity, vrRoommates, vrPassword
      FROM virtualRoom
      WHERE vrCode = '${data.vrCode}' AND vrStatus = '0'
      `;
    } else if (data.type == "vrInfo") {
      var query = `
      SELECT *
      FROM virtualRoom
      WHERE vrCode = '${data.vrCode}' AND vrStatus = '0'
      `;
    } else if (data.type == "getVRCode") {
      var query = `
      SELECT vrCode
      FROM virtualRoom
      WHERE vrHost = '${data.vrHost}' AND vrStatus = '0'
      `;
    }
    //console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.updateVirtualRoom = function updateVirtualRoom(data) {
  return new Promise((resolve, reject) => {
    if (data.type == "createVR") {
      var query = `
      INSERT INTO virtualRoom (vrPassword, vrCapacity, vrHost)
      VALUES ('${data.vrPassword}', '${data.vrCapacity}', '${data.vrHost}')
      `;
    } else if (data.type == "joinVR") {
      var query = `
      UPDATE virtualRoom
      SET 
      vrRoommates = "${data.vrRoommates}",
      currentCapacity = currentCapacity + 1
      WHERE vrCode = "${data.vrCode}"
      `;
    } else if (data.type == "deleteVR") {
      var query = `
      UPDATE virtualRoom
      SET 
      vrStatus = "2"
      WHERE vrCode = "${data.vrCode}"
      `;
    }
    console.log(query);
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
      ORDER BY village ASC
      `;
    } else if (data.type == "getBuilding") {
      var query = `
      SELECT distinct block
      FROM roomInfo
      WHERE village = "${data.village}"
      ORDER BY block ASC
      `;
    } else if (data.type == "getRoom") {
      var query = `
      SELECT *
      FROM roomInfo
      WHERE status <= '1' AND village = "${data.village}" AND block = "${data.block}"
      ORDER BY roomNumber, bed ASC
      `;
    } else if (data.type == "filterRoom") {
      var query = `
      SELECT *
      FROM roomInfo
      WHERE status <= '1' AND village = "${data.village}" AND block = "${data.block}" AND capacity = "${data.capacity}"
      ORDER BY roomNumber, bed ASC
      `;
    } else if (data.type == "getRoomCapacity") {
      var query = `
      SELECT distinct capacity
      FROM roomInfo
      WHERE village = "${data.village}" AND block = "${data.block}"
      ORDER BY capacity ASC
      `;
    } else if (data.type == "getMinRoomCapacity") {
      var query = `
      SELECT distinct MIN(capacity) AS capacity
      FROM roomInfo
      `;
    } else if (data.type == "getMaxRoomCapacity") {
      var query = `
      SELECT distinct MAX(capacity) AS capacity
      FROM roomInfo
      `;
    } else if (data.type == "checkRoomAvailability") {
      var query = `
      SELECT status
      FROM roomInfo
      WHERE roomNumber = "${data.roomNumber}" AND bed = "${data.bed}"
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
      SET status = "1",
      WHERE roomNumber = "${data.roomNumber}" AND bed = "${data.bed}"
      `;
    } 
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}