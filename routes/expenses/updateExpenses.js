var express = require('express');
var connection = require('../connection');

var router = express.Router();

/* GET users listing. */



router.post('/', function (req, res, next) {
    let expenseInfo = req.body;
    var sql = "update expenses set expenseId = '" + expenseInfo.expenseId + "', expense_date = '" + expenseInfo.expense_date + "', expense_amount = '" + expenseInfo.expense_amount + "', expense_description = '" + expenseInfo.expense_description + "' where expense_id = " + expenseInfo.expense_id+"";
    console.log(sql);
    connection.query(sql, function (err, result, fields) {
        if(err) throw err;
        res.status(200);
        res.json({
            message: "Successfully Updated"
        });
    });
    
});

module.exports = router;
