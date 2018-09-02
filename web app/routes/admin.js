var express         =   require('express');
var router          =   express.Router();
var sql             =   require('mssql');
var passport	    =	require('passport');

//for upload image to server
var multer        = require('multer');
var storage       = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/filesUploaded');
    },
    filename: function (req, file, cb) {
        var extension = file.mimetype;
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/jpg"||file.mimetype == "image/png"){
            extension = extension.substring(extension.indexOf("/")+1, extension.length);
            cb(null, file.originalname+'.'+extension);
        }
    }
});
var upload = multer({ storage: storage });

//login
router.post('/login', function(req, res, next) {
    req.checkBody('username','The Username field can not emapty.').notEmpty();
    req.checkBody('password','The Password field can not emapty.').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        res.render('index', {title: "VECS",hasError: messages.length > 0, messages: messages})
    } else {

        var r = new sql.Request();

        var username = req.body.username;
        var password = req.body.password;

        r.query(`SELECT * FROM admin1 WHERE username='${username}'`, function (error2, result) {
            if (error2) {
                console.log(error2);
                return;
            }
            if(result.recordset.length > 0) {
                if(result.recordset[0].password == password) {
                    // here change status to true for success login
                    var stat = new sql.Request();
                    var q = `UPDATE [dbo].[session] SET status = 'true'`;
                    stat.query(q, function (err, result) {
                        if (err) {throw err}
                        res.redirect('/admin/profile');
                    });
                } else {
                    res.render('index', {title: "VECS",Error: 'Password Not Correct'});
                }
            } else {
                res.render('index', {title: "VECS",Error: 'Username Not Found'});
            }
        });
    }
});

//get the profile Page
router.get('/profile', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/');
        } else {
            // if Login
            var req = new sql.Request();
            req.query('SELECT * FROM admin1', function (error2, result) {
                if (error2) {
                    console.log(error2);
                    return;
                }
                res.render('admin/profile', { title: 'VECS', user:result.recordset[0], status: true });
            });
        }
    });
});

/* GET profile setting */
router.get('/setting/:accountId', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            r.query(`SELECT * FROM admin1 WHERE id=${req.params.accountId} `, function (error2, result) {
                if(error2){throw error2;}
                res.render('admin/settings',{title: "VECS", status: true, userAccount: result.recordset[0] });
            });
        }
    });
});
router.post('/setting/:accountId', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            //var settings = new sql.Request();

            var q = `UPDATE [dbo].[admin1] SET username = '${req.body.username}' , password = '${req.body.password}' WHERE id = ${req.params.accountId}`;

            r.query(q, function (err) {
                if (err) {throw err}
                res.redirect('/admin/logout');
            });
        }
    });
});

//get the Dashboard Page
router.get('/dashboard', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            res.render('admin/dashboard', {title:"VECS",status: true});
        }
    });
});

//get temperature page Report
router.get('/temp', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            res.render('admin/temp', {title:"VECS",status: true,type:"temp"});
        }
    });
});
//get Air Quality page Report
router.get('/air', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            res.render('admin/air', {title:"VECS",status: true,type:"air"});
        }
    });
});
//get Humidaty page Report
router.get('/hum', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            res.render('admin/hum', {title:"VECS",status: true,type:"hum"});
        }
    });
});

//Get Days Page report
router.get('/daysreport/:type', function(req, res, next){
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            var type  = req.params.type;
            console.log(type);
            
            r.query(`SELECT DISTINCT day,month,year,type FROM ubnormalReadings WHERE type='${type}' `, function (error2, results2) {
                if (error2) {
                    console.log(error2);
                    return;
                }                
                var results2 = results2.recordset;
                res.render("admin/daysReports",{title: "VECS",status: true, type: type, results: results2});                            
            });    
        }
    });
});


//Get daily Report
router.get('/daily/:type/:day/:month/:year', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
                var type    = req.params.type;            
                var day     = req.params.day;
                var month   = req.params.month;
                var year    = req.params.year;
                r.query(`SELECT * FROM ubnormalReadings WHERE day='${day}' AND month='${month}' AND year='${year}' AND type='${type}' `, function (error2, results) {
                    if (error2) {
                        console.log(error2);
                        return;
                    }
                    var results = results.recordset; 
                    r.query(`SELECT MAX(CONVERT(float,value)) AS maxvalue FROM ubnormalReadings WHERE day='${day}' AND month='${month}' AND year='${year}' AND type='${type}' `, function (error2, maxValue) {
                        if (error2) {
                            console.log(error2);
                            return;
                        }
                        r.query(`SELECT MIN(CONVERT(float,value)) AS minvalue FROM ubnormalReadings WHERE day='${day}' AND month='${month}' AND year='${year}' AND type='${type}' `, function (error2, minValue) {
                            if (error2) {
                                console.log(error2);
                                return;
                            }                     
                            r.query(`SELECT  location FROM devices WHERE id='${results[0].sensorid}'`, function (error2, location) {
                                if (error2) {
                                    console.log(error2);
                                    return;
                                }
                                var date = day+"/"+month+"/"+year;

                                res.render('admin/daily',
                                    {
                                        title:"VECS",                    
                                        status      : true,
                                        results     : results,
                                        maxValue    : maxValue.recordset[0].maxvalue,
                                        minValue    : minValue.recordset[0].minvalue,
                                        date        : date,
                                        type        : type,
                                        location    : location.recordset[0].location
                                    });                                                             
                            });                                                
                        });                                
                    });
                });            
        }
    });
});

//Get Months Page report
router.get('/monthsreport/:type', function(req, res, next){
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            var type  = req.params.type;
            
            r.query(`SELECT DISTINCT month,year,type FROM ubnormalReadings WHERE type='${type}' `, function (error2, results2) {
                if (error2) {
                    console.log(error2);
                    return;
                }                
                var results2 = results2.recordset;
                res.render("admin/monthsReports",{title: "VECS",status: true, type: type, results: results2});                                           
            });  
        }
    });
});

//Get Monthly Report
router.get('/monthly/:type/:month/:year', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            var type    = req.params.type;          
                var month   = req.params.month;
                var year    = req.params.year;
                r.query(`SELECT * FROM ubnormalReadings WHERE value = (SELECT MAX( CONVERT(float,value) ) AS maxValue FROM ubnormalReadings WHERE type='${type}' AND month=${month} AND year=${year}) AND type='${type}' AND month=${month} AND year=${year}`, function (error2, maxValues) {
                    if (error2) {
                        console.log(error2);
                        return;
                    }
                    r.query(`SELECT day,AVG(CONVERT(float,value)) AS avg FROM ubnormalReadings WHERE type='${type}' AND month=${month} AND year=${year}  GROUP BY day`, function (error2, averageValue) {
                        if (error2) {
                            console.log(error2);
                            return;
                        } 
                        r.query(`SELECT day,MAX(CONVERT(float,value)) AS maxValue FROM ubnormalReadings WHERE type='${type}' AND month=${month} AND year=${year}  GROUP BY day`, function (error2, maxValuesInDays) {
                            if (error2) {
                                console.log(error2);
                                return;
                            }            
                            r.query(`SELECT  location FROM devices WHERE id='${maxValues.recordset[0].sensorid}'`, function (error2, location) {
                                if (error2) {
                                    console.log(error2);
                                    return;
                                }
                                res.render('admin/monthly', {title:"VECS",location:location.recordset[0],status: true,maxValues:maxValues.recordset,type:type, avg:averageValue.recordset,maxValuesInDays:maxValuesInDays.recordset});                                
                            });                                                        
                        });                                            
                    });  
                    
                                                 
                });                    
        }
    });
});

//Get Yearly Page report
router.get('/yearsreport/:type', function(req, res, next){
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            var type = req.params.type;
            r.query(`SELECT DISTINCT year,type FROM ubnormalReadings WHERE type='${type}' `, function (error2, results2) {
                if (error2) {
                    console.log(error2);
                    return;
                }
                res.render("admin/yearsReports",{title: "VECS",status: true,type:type,years: results2.recordset});                            
            });            
        }
    });
});

//Get Yearly Report
router.get('/yearly/:type/:year', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            var type    = req.params.type;                                       
                var year    = req.params.year;
                r.query(`SELECT month,MAX(CONVERT(float,value)) AS maxValue FROM ubnormalReadings WHERE type='${type}'  AND year=${year}  GROUP BY month`, function (error2, maxValuesInmonths) {
                    if (error2) {
                        console.log(error2);
                        return;
                    }
                    r.query(`SELECT month,AVG(CONVERT(float,value)) AS avgValue FROM ubnormalReadings WHERE type='${type}'  AND year=${year}  GROUP BY month`, function (error2, avg) {
                        if (error2) {
                            console.log(error2);
                            return;
                        }
                        r.query(`SELECT * FROM ubnormalReadings WHERE value = (SELECT MAX(CONVERT(float,value)) AS maxValue FROM ubnormalReadings WHERE type='${type}'  AND year=${year}) AND type='${type}'  AND year=${year}`, function (error2, maxValues) {
                            if (error2) {
                                console.log(error2);
                                return;
                            }
                            r.query(`SELECT  location FROM devices WHERE id='${maxValues.recordset[0].sensorid}'`, function (error2, location) {
                                if (error2) {
                                    console.log(error2);
                                    return;
                                }
                                
                                res.render('admin/yearly', {title:"VECS",maxValue:maxValues.recordset[0],location:location.recordset[0],status: true,type:type,maxValuesInmonths:maxValuesInmonths.recordset,year:year,avg:avg.recordset});     
                            });                            
                        });
                        
                    });
                    
                });            
        }
    });
});

//Get Add New Device Page 
router.get('/addnewdevice', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            res.render('admin/newDevice', {title:"VECS",status: true});
        }
    });
});
router.post('/addnewdevice', upload.any(), function(req, res, next) {
    var path;
    if(req.files[0] != undefined){
         path = req.files[0].path.slice(28);
    } else {
        path = 'logo.png'; 
    }    
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            var r = new sql.Request();
            var q = `INSERT INTO [dbo].[devices] ([ip],[type],[location],[status],[imagePath],[name],[device_num]) VALUES ('${req.body.ip}', '${req.body.type}','${req.body.location}','off','${path}','${req.body.name}','${req.body.device_num}' )`;
            r.query(q, function (err, result) {
                if (err) {throw err}
                res.redirect('/admin/devices');
            });
        }
    });
});

//Get Devices Page
router.get('/devices', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            r.query(`SELECT * FROM devices `, function (error2, devices){
                if(error2) {throw error2;}
                var foundDevices = false;
                if (devices.recordset.length > 0) {
                    foundDevices = true;
                } else {
                    foundDevices = false;
                }
                res.render('admin/devices', {title:"VECS",status: true, devices:devices.recordset, foundDevices:foundDevices});
            });
        }
    });
});

//Get Device Details
router.get('/details/:device_id', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            r.query(`SELECT * FROM devices WHERE id = '${req.params.device_id}' `, function (error2, device) {
                if(error2){throw error2;}
                var device_status = false;;
                if(device.recordset[0].status == "on") {
                    device_status = true;
                }
                var sensor;
                if(device.recordset[0].type == "sensor") {
                    sensor = true;
                }
                //var r = new sql.Request()
                res.render('admin/deviceDetails', {title:"VECS",status: true, device: device.recordset[0],device_status:device_status,sensor:sensor });
            });
        }
    });
});

//Get update device
router.get('/updatedevice/:deviceID', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            r.query(`SELECT * FROM devices WHERE id=${req.params.deviceID}`, function (err, device) {
            if (err) {throw err;}
                res.render('admin/updateDevice', {title:"VECS",status: true, device:device.recordset[0]});
            });
        }
    });
});
//POST update device
router.post('/updatedevice/:deviceID', upload.any() ,function(req, res, next) {
    var path;
    if(req.files[0] != undefined){
         path = req.files[0].path.slice(28);
    } else {       
        path = req.body.existImage; 
    }

    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            var q = `UPDATE [dbo].[devices] SET name ='${req.body.name}', ip = '${req.body.ip}', type='${req.body.type}', location='${req.body.location}',imagePath='${path}' WHERE id=${req.params.deviceID}`;
            var r = new sql.Request();
            r.query(q , function (err) {
              if (err) {throw err}
            });
            res.redirect('/admin/devices');
        }
    });
});

router.get('/deletedevice/:deviceID', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            r.query(`DELETE FROM devices WHERE id=${req.params.deviceID}`, function (err) {
                if (err) {throw err;}
                res.redirect('/admin/devices');
            });
        }
    });
});

//Logout
router.get('/logout', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            //Not Login
            res.redirect('/')
        } else {
            // if Login
            var stat = new sql.Request();
            var q = `UPDATE [dbo].[session] SET status = 'false'`;
            stat.query(q, function (err, result) {
                if (err) {throw err}
                res.redirect('/');
            });
        }
    });
});

router.post('/update/:status/:id', function (req, res, next) {
    var stat = new sql.Request();
    var q = `UPDATE [dbo].[devices] SET status = '${req.params.status}' WHERE device_num='${req.params.id}'`;
    stat.query(q, function (err, result) {
        if (err) {throw err}
        res.json({status:1,msg:"Success"});
    });
    
});

//http://localhost:3000/admin/alarm
router.post('/alarm', function(req, res, next){
    var sqlrequest = new sql.Request();
    var status;
    var q = `SELECT status FROM [dbo].[devices] WHERE id='8'`;
    sqlrequest.query(q, function (err, result) {
        if (err) {throw err}        
        if(result.recordset[0].status == 'on'){
            status = 1;
        }else{
            status = 0;
        }
        res.json({status:status , msg: "Room 4 under a big danger"});  
    });
});
module.exports = router;
