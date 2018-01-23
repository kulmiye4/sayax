var express = require('express');
var connection = require('../connection');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    connection.query("select * from expenses", function(err, result, fields){
  res.send(result[0]);  
    })
});

router.post('/', function(req, res) {
    connection.query("select expense_id, expensedetail.expenseType, date_format(expense_date, '%Y-%m-%d')as expense_date, expense_amount, expense_description from expenses, expensedetail where expenses.expenseId = expensedetail.expenseId", function(err, result, fields){
        if(err) throw err;
        for (i = 0; i < result.length; i++) { result[i].action = "<a class=\"view\" href=\"#templates/expenses/veiwexpenses.html\">View</a>" }
  res.status(200);
  res.json({
      payload: {
          totalRecords: result.length,
          data: JSON.stringify(result),
        err: "",
        message: "Success"
      }
    });
    });
});

router.post('/expenseList', function(req, res) {
    connection.query("select expenseid, expenseType from expensedetail", function(err, result, fields){
        if(err) throw err;
        res.status(200);
        res.json({
            payload: {
                totalRecords: result.length,
                data: JSON.stringify(result),
              err: "",
              message: "Success"
            }
          });
    });
});

router.post('/expenseTotal', function(req, res) {
    connection.query("SELECT SUM(expenses.expense_amount) as expenseamount FROM expenses", function(err, result, fields){
        if(err) throw err;
        res.status(200);
        res.json({
            payload: {
                totalRecords: result.length,
                data: JSON.stringify(result),
              err: "",
              message: "Success"
            }
          });
    });
});

router.post('/expenseReport', function(req, res) {
    var sql = "select expensedetail.expenseType, SUM(expenses.expense_amount)as amount FROM expenses, expensedetail"+
    " WHERE expenses.expenseId = expensedetail.expenseId GROUP BY expenses.expenseId";
    connection.query(sql, function(err, result, fields){
        if(err) throw err;
        res.status(200);
        res.json({
            payload: {
                totalRecords: result.length,
                data: JSON.stringify(result),
              err: "",
              message: "Success"
            }
          });
    });
});

router.post('/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    //var id = 2;
    connection.query("SELECT expense_id, expensedetail.expenseId, expensedetail.expenseType, date_format(expense_date, '%Y-%m-%d')as expense_date, expense_amount, expense_description from expenses, expensedetail where expenses.expenseId = expensedetail.expenseId and expense_id = " + id, function (err, result, fields) {
        //console.log(result);
        res.status(200);
        res.json({
            payload: {
                totalRecords: result.length,
                data: JSON.stringify(result),
              err: "",
              //eroor
              message: "success"
            }
          });
    });
});


module.exports = router;
