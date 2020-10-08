const express = require('express');
const router = express.Router();

const mysql = require('mysql');
var moment = require('moment');
var db = require('../function/db');


var dbFYP = db.connect('FYP');

module.exports = router;
module.exports.dbFYP = dbFYP;