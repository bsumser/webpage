const express = require("express");
const app = express();
const mysql = require('mysql');
const PORT = 3001;

app.use(express.static('public'));

const config;
const config = {
  mysql_pool : mysql.createPool({
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'keeper',
  password: 'Chronicler_666',
  database: "web"       
  })
};

module.exports = config; //connection for use in other scripts

const server = app.listen(3000, function(error){
    const port = server.address().port;

    if (!error)
        console.log("Server started at http://localhost:%s", port);
    else
        console.log("Error occurred, server cant start", error)
});
