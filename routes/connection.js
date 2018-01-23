var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "samiir"
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});



module.exports = conn;
