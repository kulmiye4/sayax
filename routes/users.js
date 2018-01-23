var express = require('express');
var mysql = require('mysql');
//var connection = require('routes/connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
