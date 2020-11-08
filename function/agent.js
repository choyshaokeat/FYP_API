const db = require("../api/db.js");
var twilio = require('twilio');
const sgMail = require('@sendgrid/mail');
const request = require('request');
var RES = require('../res');

var dbFoododo = db.dbFoododo;
var dbDarkMatter = db.dbDarkMatter;

module.exports.mail = function mail(data) {
  return new Promise((resolve, reject) => {
    console.log("Booking Confirmation Email");
    console.log(data);
    sgMail.setApiKey('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');
    if (data.type == 'bookingConfirmation') {
      var msg = {
        to: data.receiver,
        from: {
          email: "verification@roomy.co",
          name: "Roomy"
        },
        subject: data.subject,
        html:
          `<html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>First time Login</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://kit.fontawesome.com/a076d05399.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          </head>
          <style>
            #button_center {
              text-align: center;
            }

            .btn {
              border: none;
              color: #ffffff;
              background-color: #0f006e;
              padding: 14px 28px;
              font-size: 16px;
              cursor: pointer;
              display: inline-block;
              border-radius: 4px;
              height: 50px;
              width: 640px;
            }

            img {
              object-fit: cover;
            }
          </style>
          <body style="margin: 0; padding: 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 10px 0 30px 0;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="700"
                    style="border: 1px solid #cccccc; border-collapse: collapse;">
                    <tr>
                      <td align="center" bgcolor="#ffffff"
                        style="color: #585858; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                        <h2 style="color: #8C7364">Roomy</h2>
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                        style="padding: 18px 0 18px 0; color: #ffffff; background: #D2B193; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">
                        <b>BOOKING CONFIRMATION</b>
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#ffffff" style="padding: 30px 30px 30px 30px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="color: #000000; font-family: Arial, sans-serif; font-size: 17px;">
                              <p><b>Dear Student,</b></p>
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #585858; font-family: Arial, sans-serif; font-size: 15px; line-height: 20px;">
                              <p>Thank you for making reservation through Roomy. Below is your booking details.</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#f0f0f0"
                        style="padding: 10px 30px 10px 30px; font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
                        <p><b>Student Name: </b>`+ data.studentName +`</p>
                        <p><b>Student ID: </b>`+ data.studentID +`</p>
                        <p><b>Room Number: </b>`+ data.roomNumber +`</p>
                        <p><b>Bed: </b>`+ data.bed +`</p>
                        <p><b>Aircond: </b>`+ data.aircond +`</p>
                        <p><b>No. of Semester: </b>`+ data.numberOfSemester +`</p>
                        <p><b>Total Fees: </b>RM`+ data.fees +`</p>
                        <p><b>Check In Date: </b>`+ data.expectedCheckInDate +`</p>
                        <p><b>Check Out Date: </b>`+ data.expectedCheckOutDate +`</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
          </body>`,
      };
    } else if (data.type == 'bookingPeriodReminder') {
      console.log("bookingPeriodReminder");
      console.log(data);
      sgMail.setApiKey('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');
      var msg = {
        to: data.receiver,
        from: {
          email: "verification@roomy.co",
          name: "Roomy"
        },
        subject: data.subject,
        html:
          `<html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>First time Login</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://kit.fontawesome.com/a076d05399.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          </head>
          <style>
            #button_center {
              text-align: center;
            }

            .btn {
              border: none;
              color: #ffffff;
              background-color: #0f006e;
              padding: 14px 28px;
              font-size: 16px;
              cursor: pointer;
              display: inline-block;
              border-radius: 4px;
              height: 50px;
              width: 640px;
            }

            img {
              object-fit: cover;
            }
          </style>
          <body style="margin: 0; padding: 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 10px 0 30px 0;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="700"
                    style="border: 1px solid #cccccc; border-collapse: collapse;">
                    <tr>
                      <td align="center" bgcolor="#ffffff"
                        style="color: #585858; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                        <h2 style="color: #8C7364">Roomy</h2>
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                        style="padding: 18px 0 18px 0; color: #ffffff; background: #D2B193; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">
                        <b>BOOKING REMINDER</b>
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#ffffff" style="padding: 30px 30px 30px 30px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="color: #000000; font-family: Arial, sans-serif; font-size: 17px;">
                              <p><b>Dear Student,</b></p>
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #585858; font-family: Arial, sans-serif; font-size: 15px; line-height: 20px;">
                              <p>Please be reminded that accommodation booking will be available soon!</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#f0f0f0"
                        style="padding: 10px 30px 10px 30px; font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
                        <p><b>Starting Date: </b>`+ data.bookingPeriodStart +`</p>
                        <p><b>Ending Date: </b>`+ data.bookingPeriodEnd +`</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
          </body>`,
      };
    }
    sgMail.send(msg);
    // async () => {
    //     try {
    //       await sgMail.send(msg);
    //       resolve('ok')
    //     } catch (err) {
    //         reject(err.toString);
    //     }
    // };
    resolve(msg);
  });
}


