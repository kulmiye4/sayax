var express = require('express');
var connection = require('../connection');

var router = express.Router();

/* GET users listing. */



router.post('/', function (req, res, next) {
    let expense = req.body;
    // let payload = JSON.parse(req.body.PayLoad);
    // console.log(payload);
    // let expense = payload.expense;
    var sql = "insert into expenses (expenseId, expense_date, expense_amount, expense_description) values ('" + expense.type + "','" + expense.date + "', '" + expense.amount + "', '" + expense.description +"')";
    connection.query(sql, function (err, result, fields) {
        res.status(200);
        res.json({
            message: "Successfully added an Expense"
        });
        console.log(result);
    });
    
});

module.exports = router;
