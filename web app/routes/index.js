var express       = require('express');
var router        = express.Router();
var sql           =   require('mssql');
/* GET home page. */
router.get('/', function(req, res, next) {
    var r = new sql.Request();
    r.query(`SELECT * FROM session `, function (error2, result) {
        if (error2) {
            console.log(error2);
            return;
        }
        var status = result.recordset[0].status;

        if (status == "false") {
            console.log(status);
            res.render('index', { title: 'VECS', status: false});
        } else {
            console.log(status);
            res.render('index', { title: 'VECS', status: true});
        }
    });
});
module.exports = router;