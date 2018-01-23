var express = require('express');
var connection = require('./connection');

var router = express.Router();


router.post('/', function (req, res, next) {
  let user = req.body;
  console.log(user);
  //var query = "select userName, userPassword from users where userName = '"+localStorage.getItem("userName")+"'";
  //console.log(query);
  var sql = "select userName, userPassword from users where userName = '"+user.userName+"' and userPassword = '"+user.userPassword+"'";
  connection.query(sql, function (err, result, fields) {
    if(err) throw err;
    console.log(sql);
    console.log(result);
    res.status(200);
    if(result.length>0){
      res.json({
        payload: {
          data: JSON.stringify(result)
        },
        records: result.length,
        message: "Successfully loged in"
      })
    }
    else {
      res.json({
        message: "Failed to login"
      })
    }
    
  })
});

router.post('/addUser', function (req, res, next) {
  let user = req.body;
  console.log(user);
  var sql = "insert into users (user_name, user_password) values ('"+user.userName+"', '"+user.password+"')";
  connection.query(sql, function (err, result, fields) {
    if(err) throw err;
    res.status(200);
    res.json({
        message: "Successfully added the invoice"
    });
});
            
});

module.exports = router;
