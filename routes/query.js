var express = require('express');
var connection = require('./connection');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if(err) throw err;
        res.send(JSON.stringify(result));
        console.log(result);
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    //var id = 2;
    connection.query("SELECT * FROM customers", function (err, result, fields) {
        res.send(result);
        console.log(result);
    });
});

router.post('/', function (req, res, next) {
    // var id = req.body.id;
    // var username = req.body.username;
    // console.log(req.body);
    // connection.query("insert into users values ("+id+", '"+username+"')", function (err, result, fields) {
    //     res.send(JSON.stringify(result));
    //     res.send("ku soo dhawoow " + req.body.username);
    //     console.log(result);
    // });
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        res.status(200);
        res.json({
            payload: {
                totalRecords: result.length,
                data: JSON.stringify(result),
                err: "",
                message: "Success"
            }
        })
    });
    
});

module.exports = router;
