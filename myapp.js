var express = require("express");
var app = express();
var mysql = require('mysql');
const PORT = 3001;

app.use(express.static('public'));

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Fusion,1488',
  database: "information_schema"       
});

// open the MySQL connection
connection.connect(error => {
    if (error){
        console.log("A error has been occurred "
            + "while connecting to database.");       
        throw error;
    }
     
    //If Everything goes correct, Then start Express Server
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready and "
             + "Server is Listening on Port ", PORT);
    })
});

var server = app.listen(3000, function(error){
    var port = server.address().port;

    if (!error)
        console.log("Server started at http://localhost:%s", port);
    else
        console.log("Error occurred, server cant start", error)
});

