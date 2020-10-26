const express = require('express');
const router = express.Router();

var db = require("../api/db.js");
var fc = require('../function/admin');
var ms = require('../function/agent');
var RES = require('../res');
var encdec = require('../function/encdec');
var moment = require('moment');
var uniqid = require('uniqid');

router.get('/', async function (req, res) {
  console.log('/admin/');
});

module.exports = router;

// Client Info
router.post('/login', async function (req, res) {
  try {
    console.log('/login');
    var data = req.body.data;
    data = encdec.decryptObject('login', data);
    data = await fc.login(data);
    return RES.solved(res, data, 'login');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/updateStudentInfo', async function (req, res) {
  try {
    console.log('/updateStudentInfo');
    var data = req.body.data;
    data = encdec.decryptObject('admin', data);
    data = await fc.updateStudentInfo(data);
    return RES.solved(res, data, 'admin');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/getAdminInfo', async function (req, res) {
  try {
    console.log('/getAdminInfo');
    var data = req.body.data;
    data = encdec.decryptObject('admin', data);
    data = await fc.getAdminInfo(data);
    return RES.solved(res, data, 'admin');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/getBookingInfo', async function (req, res) {
  try {
    console.log('/getBookingInfo');
    var data = req.body.data;
    data = encdec.decryptObject('admin', data);
    data = await fc.getBookingInfo(data);
    return RES.solved(res, data, 'admin');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/updateBookingInfo', async function (req, res) {
  try {
    console.log('/updateBookingInfo');
    var data = req.body.data;
    data = encdec.decryptObject('admin', data);
    data = await fc.updateBookingInfo(data);
    return RES.solved(res, data, 'admin');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/getRoomInfo', async function (req, res) {
  try {
    console.log('/getRoomInfo');
    var data = req.body.data;
    data = encdec.decryptObject('admin', data);
    data = await fc.getRoomInfo(data);
    return RES.solved(res, data, 'admin');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/updateRoomInfo', async function (req, res) {
  try {
    console.log('/updateRoomInfo');
    var data = req.body.data;
    data = encdec.decryptObject('admin', data);
    data = await fc.updateRoomInfo(data);
    return RES.solved(res, data, 'admin');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});