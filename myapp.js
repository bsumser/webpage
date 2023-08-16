const express = require("express");
const app = express();
const mysql = require('mysql');
const PORT = 3001;

app.use(express.static('public'));

// Create a connection to the database
<<<<<<< Updated upstream
//const connection = mysql.createConnection({
//  host: 'localhost',
//  user: 'keeper',
//  password: 'Chronicler_666',
//  database: "web"       
//});
//
//// open the MySQL connection
//connection.connect(error => {
//    if (error){
//        console.log("A error has been occurred "
//            + "while connecting to database.");       
//        throw error;
//    }
//     
=======
const config;
const config = {
  mysql_pool : mysql.createPool({
  host: 'localhost',
  user: 'keeper',
  password: 'Chronicler_666',
  database: "web"       
  })
};

// open the MySQL connection
//connection.connect(error => {
//    if (error){
//        console.log("A error has been occurred "
//            + "while connecting to database.");
//        throw error;
//    }
//
>>>>>>> Stashed changes
//    //If Everything goes correct, Then start Express Server
//    app.listen(PORT, ()=>{
//        console.log("Database connection is Ready and "
//             + "Server is Listening on Port ", PORT);
//    })
//});
<<<<<<< Updated upstream
//
//module.exports = connection; //connection for use in other scripts
=======

module.exports = config; //connection for use in other scripts
>>>>>>> Stashed changes

const server = app.listen(3000, function(error){
    const port = server.address().port;

    if (!error)
        console.log("Server started at http://localhost:%s", port);
    else
        console.log("Error occurred, server cant start", error)
});
