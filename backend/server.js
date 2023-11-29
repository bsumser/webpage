const express = require("express")
require('dotenv').config()
const mysql = require('mysql');
const PORT = process.env.SERVER_PORT
const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

//con.connect(function(err) {
//  if (err) throw err;
//  console.log("Connected!");
//});

const server = app.listen(PORT, function(error){

    if (!error)
        console.log("Server started at http://localhost:%s", PORT);
    else
        console.log("Error occurred, server cant start", error)
});