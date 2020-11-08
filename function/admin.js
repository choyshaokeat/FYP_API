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
        bookingStatus = "${data.bookingStatus}",
        roomNumber = "${data.roomNumber}",
        bed = "${data.bed}"
        WHERE studentID = "${data.studentID}"
        `;
    } else if (data.type == "deleteRoomInfo") {
      var query = `
        UPDATE studentInfo
        SET 
        bookingStatus = "${data.bookingStatus}",
        roomNumber = NULL,
        bed = NULL,
        vrCode = NULL
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
    if (data.type == "activeBookingHistory") {
      var query = `
      SELECT *
      FROM bookingHistory
      WHERE 
      status = "Booked" OR status = "Checked-in"
      ORDER BY UNIX_TIMESTAMP(bookingDate) DESC
      `;
    } else if (data.type == "filterActiveBookingHistory") {
      var query = `
      SELECT *
      FROM bookingHistory
      WHERE 
      studentID = "${data.studentID}" 
      AND (status = "Booked" OR status = "Checked-in")
      ORDER BY UNIX_TIMESTAMP(bookingDate) DESC
      `;
    } else if (data.type == "all") {
      var query = `
      SELECT *
      FROM bookingHistory
      ORDER BY UNIX_TIMESTAMP(bookingDate) DESC
      LIMIT 200
      `;
    } 
    console.log(query);
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
      (studentID, roomNumber, village, block, level, bed, aircond, fees, status, bookingDate, expectedCheckInDate, expectedCheckOutDate, numberOfSemester)
      VALUES
      ("${data.studentID}", "${data.roomNumber}", "${data.village}", "${data.block}", "${data.level}", "${data.bed}", "${data.aircond}",
      "${data.fees}", "${data.status}", "${data.bookingDate}", "${data.expectedCheckInDate}", "${data.expectedCheckOutDate}", "${data.numberOfSemester}")
      `;
    } else if (data.type == "checkIn") {
      var query = `
      UPDATE bookingHistory
      SET status = 'Checked-in', checkInDate = '${data.checkInDate}'
      WHERE studentID = '${data.studentID}' AND roomNumber = '${data.roomNumber}' AND bed = '${data.bed}'
      `;
    } else if (data.type == "checkOut") {
      var query = `
      UPDATE bookingHistory
      SET status = 'Checked-out', checkOutDate = '${data.checkOutDate}'
      WHERE studentID = '${data.studentID}' AND roomNumber = '${data.roomNumber}' AND bed = '${data.bed}'
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
      WHERE genderAllowed = "${data.gender}" AND (status = 0 OR status = 1)
      ORDER BY village ASC
      `;
    } else if (data.type == "getBuilding") {
      var query = `
      SELECT distinct block
      FROM roomInfo
      WHERE village = "${data.village}" AND genderAllowed = "${data.gender}" AND (status = 0 OR status = 1)
      ORDER BY block ASC
      `;
    } else if (data.type == "getRoom") {
      var query = `
      SELECT *
      FROM roomInfo
      WHERE status <= '1' AND village = "${data.village}" AND block = "${data.block}" AND genderAllowed = "${data.gender}" AND (status = 0 OR status = 1)
      ORDER BY roomNumber, bed ASC
      `;
    } else if (data.type == "filterRoom") {
      var query = `
      SELECT *
      FROM roomInfo
      WHERE status <= '1' AND village = "${data.village}" AND block = "${data.block}" AND capacity = "${data.capacity}" AND genderAllowed = "${data.gender}" AND (status = 0 OR status = 1)
      ORDER BY roomNumber, bed ASC
      `;
    } else if (data.type == "getRoomCapacity") {
      var query = `
      SELECT distinct capacity
      FROM roomInfo
      WHERE village = "${data.village}" AND block = "${data.block}" AND genderAllowed = "${data.gender}" AND (status = 0 OR status = 1)
      ORDER BY capacity ASC
      `;
    } else if (data.type == "getMinRoomCapacity") {
      var query = `
      SELECT distinct MIN(capacity) AS capacity
      FROM roomInfo
      WHERE genderAllowed = "${data.gender}" AND (status = 0 OR status = 1)
      `;
    } else if (data.type == "getMaxRoomCapacity") {
      var query = `
      SELECT distinct MAX(capacity) AS capacity
      FROM roomInfo
      WHERE genderAllowed = "${data.gender}" AND (status = 0 OR status = 1)
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
      WHERE village = "${data.village}" AND genderAllowed = "${data.gender}" AND capacity = "${data.capacity}" AND status = "${data.status}"
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
      SET status = "${data.status}"
      WHERE roomNumber = "${data.roomNumber}" AND bed = "${data.bed}"
      `;
    } else if (data.type == "deleteCurrentCapacity") {
      var query = `
      UPDATE roomInfo
      SET currentCapacity = currentCapacity - 1
      WHERE roomNumber = "${data.roomNumber}"
      `;
    } else if (data.type == "addCurrentCapacity") {
      var query = `
      UPDATE roomInfo
      SET currentCapacity = currentCapacity + 1
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
      WHERE roomNumber = "${data.roomNumber}" AND bed = "${data.bed}"
      `;
    } else if (data.type == 'checkOut') {
      var query = `
      UPDATE roomInfo
      SET
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

module.exports.getBookingDocument = function getBookingDocument(data) {
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

module.exports.updateBookingDocument = function updateBookingDocument(data) {
  return new Promise((resolve, reject) => {
    if (data.type == "checkInOutDate") {
      var query = `
      UPDATE bookingDocument
      SET
      sem1CheckInDate = "${data.sem1CheckInDate}",
      sem1CheckOutDate = "${data.sem1CheckOutDate}",
      sem2CheckInDate = "${data.sem2CheckInDate}",
      sem2CheckOutDate = "${data.sem2CheckOutDate}",
      sem3CheckInDate = "${data.sem3CheckInDate}",
      sem3CheckOutDate = "${data.sem3CheckOutDate}",
      maxBookingSemester = "${data.maxBookingSemester}"
      WHERE id = 0
      `;
    } else if (data.type == "bookingPeriod") {
      var query = `
      UPDATE bookingDocument
      SET
      bookingPeriodStart = "${data.bookingPeriodStart}",
      bookingPeriodEnd = "${data.bookingPeriodEnd}",
      emailStatus = 0
      WHERE id = 0
      `; 
    }
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}

module.exports.getChartData = function getChartData(data) {
  return new Promise((resolve, reject) => {
    if (data.type == "bookingRateChart") {
      var query = `
      SELECT 
      (SELECT count(studentID) FROM studentInfo WHERE bookingStatus = '2') AS booked,
      (SELECT count(studentID) FROM studentInfo WHERE bookingStatus != '2') AS notBook
      `;
    } else if (data.type == "semBookChart") {
      var query = `
      SELECT
      (SELECT count(studentID) FROM bookingHistory WHERE expectedCheckInDate >= '${data.sem1CheckInDate}' AND expectedCheckOutDate <= '${data.sem1CheckOutDate}') AS sem1Data,
      (SELECT count(studentID) FROM bookingHistory WHERE expectedCheckInDate >= '${data.sem2CheckInDate}' AND expectedCheckOutDate <= '${data.sem2CheckOutDate}') AS sem2Data,
      (SELECT count(studentID) FROM bookingHistory WHERE expectedCheckInDate >= '${data.sem3CheckInDate}' AND expectedCheckOutDate <= '${data.sem3CheckOutDate}') AS sem3Data
      `;
    } else if (data.type == "villageOccupancyChart") {
      var query = `
      SELECT count(roomNumber) AS count
      FROM roomInfo 
      WHERE status = '${data.status}' AND village = '${data.village}'
      `;
    }
    console.log(query);
    dbFYP.query(query, function (err, snapshot) {
      if (err) return reject(err.sqlMessage);
      resolve(snapshot);
    });
  });
}