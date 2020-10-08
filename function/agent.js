const db = require("../api/db.js");
var twilio = require('twilio');
const sgMail = require('@sendgrid/mail');
const request = require('request');
var RES = require('../res');

var dbFoododo = db.dbFoododo;
var dbDarkMatter = db.dbDarkMatter;


module.exports.getGeolocation = function getGeolocation(data) {
  return new Promise((resolve, reject) =>{
    request.post(data, async function(error, response, body){
      var queryData = JSON.parse(response.body);
      var qr = queryData.results;
      var result = {
          "placeID" : qr[0].place_id,
          "lat" : qr[0].geometry.location.lat,
          "lng" : qr[0].geometry.location.lng
      }
      //console.log(result);
      if (queryData.status == "OK"){
          resolve(result);
      }
      reject(error);
    });
  });
}

module.exports.mail = function mail(data) {
  return new Promise((resolve, reject) => {
    console.log(data);
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.setApiKey('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');
    if (data.type == 'verification_code') {
      var msg = {
        to: data.to,
        from: {
          email: "verification@foododo.co",
          name: "Foododo Verification Service"
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
                        <img src="https://api.foododo.co/global/emailHeaderLogo.png" alt="email_header" height="58px"
                          style="vertical-align: bottom; padding: 18px 0 18px 0;" />
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                        style="padding: 18px 0 18px 0; color: #ffffff; background: linear-gradient(50deg,#ffbb00,#AE00FF); font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">
                        <b>VERIFICATION SERVICE</b>
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#ffffff" style="padding: 30px 30px 30px 30px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="color: #000000; font-family: Arial, sans-serif; font-size: 17px;">
                              <p><b>Dear Mr/Mrs,</b></p>
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #585858; font-family: Arial, sans-serif; font-size: 15px; line-height: 20px;">
                              <p>Below is the code you need to proceed to the next action.</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #585858; font-family: Arial, sans-serif; font-size: 15px; line-height: 20px;">
                              <p id="button_center">`+ data.html + `</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#f0f0f0"
                        style="padding: 10px 30px 10px 30px; font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
                        <p><b>Something's Wrong? <a href="mailto:suppport@foododo.co?subject=Verification">Contact Us</a></b></p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="padding: 25px 25px 25px 25px; color: #ffffff; background: linear-gradient(50deg,#ffbb00,#AE00FF);">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" width="75%">
                              <b>&reg; Foododo</b><br />
                              <a href="#" style="color: #ffffff;">
                                <font color="#ffffff">www.foododo.com</font>
                              </a>
                              <p style="line-height: 0px; font-size: 12px;">Be our merchant:
                                <a href="https://join.foododo.co" style="color: #ffffff;">Discover
                                </a> |
                                <a href="https://join.foododo.co" style="color: #ffffff;">Join
                                </a>
                              </p>
                            </td>
                            <td align="right" width="25%">
                              <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td">
                                    <a href="http://www.facebook.com/" style="color: #ffffff; font-size:24px">
                                      <i class="fab fa-facebook-square"></i>
                                    </a>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                            <td">
                              <a href="http://www.twitter.com/" style="color: #ffffff; font-size:24px">
                                <i class="fab fa-twitter-square"></i>
                              </a>
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
    } else if (data.type == 'new_user') {
      var msg = {
        to: 'choy950721@gmail.com',
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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


