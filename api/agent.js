const express = require('express');
const router = express.Router();
const request = require('request');

var ms = require('../function/agent');
var RES = require('../res');
var encdec = require('../function/encdec');
var db = require("../api/db.js");

router.get('/', async function (req, res) {
    console.log('/agent/');
});

module.exports = router;

router.post('/mail', async function (req, res) {
    console.log('/mail/');
    try {
        console.log('/mail');
        var data = req.body.data;
        data = encdec.decryptObject('mail', data);
        data = await ms.mail(data);
        return RES.solved(res, data, 'mail');
    } catch (err) {
        console.log('err', err);
        return RES.error(res, err, `Failed`);
    }
});