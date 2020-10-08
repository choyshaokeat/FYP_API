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

router.post('/geocoding', async function(req, res) {
    console.log('/agent/geocoding');
    var addr  = req.body.address;
    var options = {
        url : db.googleMapGeocoding + "address=" + addr + "&key=" + db.GOOGLE_MAP_API_KEY
    };
    console.log(options);
    //https://developers.google.com/maps/documentation/javascript/geocoding
    try { 
        console.log('/geocoding');
        data = await ms.getGeolocation(options);
        console.log(data);
        return RES.solved(res, data, 'geocoding');
    }catch (err) {
        console.log('err', err);
        return RES.error(res, err, `Failed`);
    }
    // request.post(options, async function(error, response, body){
    //     var queryData = JSON.parse(response.body);
    //     var qr = queryData.results;
    //     var result = {
    //         "placeID" : qr[0].place_id,
    //         "lat" : qr[0].geometry.location.lat,
    //         "lng" : qr[0].geometry.location.lng
    //     }
    //     console.log(result);
    //     if (queryData.status == "OK"){
    //         return RES.solved(res, result, 'geocoding');
    //     }
    //     return RES.error(res, result, `Failed`);
    // });
    
});