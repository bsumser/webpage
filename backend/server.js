const express = require("express")
require('dotenv').config()

const app = express();
const http = require("http")
const PORT = process.env.SERVER_PORT
const server = http.createServer(app)
const { Server } = require("socket.io")

const io = new Server(server);

const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

//con.connect(function(err) {
//  if (err) throw err;
//  console.log("Connected!");
//});

server.listen(PORT, function(error){

    if (!error)
        console.log("Server started at http://localhost:%s", PORT);
    else
        console.log("Error occurred, server cant start", error)
});