var express               = require('express');
var router                = express.Router();
var sql                     =   require('mssql');

//localhost:3000/api/login

router.post('/login', function (req, res) {

    var r = new sql.Request();

    var username = req.body.username;
    var password = req.body.password;

    r.query(`SELECT * FROM admin WHERE username='${username}'`, function (err, result) {
        if (err) {
            res.json({status: 0, message: err});
        }
        if(result.recordset.length > 0) {
            
            if(result.recordset[0].password == password) {
                res.json({status:1,user:result.recordset[0], message: "success"});
            } else {
                res.json({status:0, message: 'Password Not Correct'});
            }
        } else {
            res.json({status:0 , message: 'Username Not Found'});
        }
    });
});

//localhost:3000/api/devices
router.post('/devices', function (req, res) {
    var r = new sql.Request();
    r.query(`SELECT * FROM device `, function (err, devices){
        if(err) {
            res.json({status: 0, message: err});
        }
        if (devices.recordset.length > 0) {
            res.json({status: 1,message:devices.recordset});
        } else {
            res.json({status:0, message: "No Devices"});
        }
    });
});

//localhost:3000/api/adddevice
router.post('/adddevice', function (req, res) {
    var r = new sql.Request();
    var q = `INSERT INTO [dbo].[device] ([device_ip],[type],[location],[status], [device_icone]) VALUES ('${req.body.ip}', '${req.body.type}','${req.body.location}','on', 'logo.png' )`;
    r.query(q, function (err, result) {
        if (err) {
            res.json({status:0, message: err});
        }
        res.json({status:1 , message:"success"});
    });
});

module.exports = router;
