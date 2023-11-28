const express = require("express");
const mysql = require('mysql');
const app = express();
const PORT = 3001;
//const io = socketIO(server)

app.use(express.static('public'));

var config;
config = {
  mysql_pool : mysql.createPool({
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

//// make a connection with the user from server side
//io.on('connection', (socket)=>{
//  console.log('New user connected');
//});
