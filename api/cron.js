const cron = require('node-cron');
const express = require('express');
const uniqid = require('uniqid');
const moment = require('moment');
const router = express.Router();

var ag = require('../function/agent');
var fn = require('../function/cron');
var RES = require('../res');
var encdec = require('../function/encdec');


router.get('/', async function (req, res) {
  console.log('/merchant/');
});

module.exports = router;
let ts = Date.now();
let dateOb = new Date(ts);
let hours = dateOb.getHours();
let minutes = dateOb.getMinutes();
let seconds = dateOb.getSeconds();
let date = dateOb.getDate();
let month = dateOb.getMonth() + 1;
let year = dateOb.getFullYear();
let timezone = dateOb.getTimezoneOffset();

// seonds, minutes, hours, day, months (0-11), day of week (0-6)
cron.schedule("0 0 */6 * * *", async function (req, res) {
  console.log("/Automated Email Reminder")

  var emailAddress = await fn.getAllStudentEmail()
  var data = await fn.getBookingDocument()

  //console.log(data);
  if ((moment(data[0].bookingPeriodStart).unix() < moment().add(1, 'w').unix()) && data[0].emailStatus == 0 ){
    for (let i=0; i<emailAddress.length; i++) {
      var emailData = {
        type: "bookingPeriodReminder",
        subject: "Accommodation Booking Reminder",
        receiver: emailAddress[i].studentEmail,
        bookingPeriodStart: moment(data[0].bookingPeriodStart).format("YYYY-MM-DD"),
        bookingPeriodEnd: moment(data[0].bookingPeriodEnd).format("YYYY-MM-DD")
      }
      console.log(emailData);
      //await ag.mail(emailData);
    }
    //await fn.setBookingDocument();
  }
},
  {
    scheduled: true,
    timezone: "Asia/Singapore"
  }
);

/* cron.schedule("0 0 * * * *", async function (req, res) {
  console.log("/Automated Email Reminder Test")

  var data = await fn.getBookingDocument()

  var emailData = {
    type: "bookingPeriodReminder",
    subject: "Accommodation Booking Reminder",
    receiver: "choyshaokeat@gmail.com",
    bookingPeriodStart: moment(data[0].bookingPeriodStart).format("DD/MM/YYYY hh:mm A"),
    bookingPeriodEnd: moment(data[0].bookingPeriodEnd).format("DD/MM/YYYY hh:mm A")
  }
  console.log(emailData);
  await ag.mail(emailData);

},
  {
    scheduled: true,
    timezone: "Asia/Singapore"
  }
); */
