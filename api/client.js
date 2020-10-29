const axios = require('axios');
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request = require('request');

var db = require("../api/db.js");
var fc = require('../function/client');
var ms = require('../function/agent');
var RES = require('../res');
var encdec = require('../function/encdec');
var moment = require('moment');
var uniqid = require('uniqid');


router.get('/', async function (req, res) {
  console.log('/client/');
});

module.exports = router;

// Client Info
router.post('/registerClient', async function (req, res) {
  try {
    console.log('/registerClient');

    var data = req.body.data;
    if (typeof data == 'string') data = encdec.decryptObject('client', data);

    var registerID = (uniqid('CLE_')).toUpperCase();
    var upload = {
      clientID: registerID,
      clientEmail: data.clientEmail,
      clientContact: data.clientContact,
      clientName: data.clientName,
      clientPW: data.clientPW,
      clientAddress: data.clientAddress
    };
    console.log(upload)
    data = await fc.registerClient(upload);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/registerCheck', async function (req, res) {
  try {
    console.log('/registerCheck');
    var data = req.body.data;
    data = encdec.decryptObject('client', data);
    data = await fc.registerCheck(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

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
    data = encdec.decryptObject('client', data);
    data = await fc.updateStudentInfo(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/getStudentInfo', async function (req, res) {
  try {
    console.log('/getStudentInfo');
    var data = req.body.data;
    data = encdec.decryptObject('client', data);
    data = await fc.getStudentInfo(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/getBookingInfo', async function (req, res) {
  try {
    console.log('/getBookingInfo');
    var data = req.body.data;
    data = encdec.decryptObject('client', data);
    data = await fc.getBookingInfo(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/updateBookingInfo', async function (req, res) {
  try {
    console.log('/updateBookingInfo');
    var data = req.body.data;
    data = encdec.decryptObject('client', data);
    data = await fc.updateBookingInfo(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/getVirtualRoom', async function (req, res) {
  try {
    console.log('/getVirtualRoom');
    var data = req.body.data;
    data = encdec.decryptObject('client', data);
    data = await fc.getVirtualRoom(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/updateVirtualRoom', async function (req, res) {
  try {
    console.log('/updateVirtualRoom');
    var data = req.body.data;
    data = encdec.decryptObject('client', data);
    data = await fc.updateVirtualRoom(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/getRoomInfo', async function (req, res) {
  try {
    console.log('/getRoomInfo');
    var data = req.body.data;
    data = encdec.decryptObject('client', data);
    data = await fc.getRoomInfo(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/updateRoomInfo', async function (req, res) {
  try {
    console.log('/updateRoomInfo');
    var data = req.body.data;
    data = encdec.decryptObject('client', data);
    data = await fc.updateRoomInfo(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});

router.post('/getBookingDocument', async function (req, res) {
  try {
    console.log('/getBookingDocument');
    var data = req.body.data;
    data = encdec.decryptObject('client', data);
    data = await fc.getBookingDocument(data);
    return RES.solved(res, data, 'client');
  } catch (err) {
    console.log('err', err);
    return RES.error(res, err, `Failed`);
  }
});