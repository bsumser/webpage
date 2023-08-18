const mysqlConf = require(config.js).mysql_pool;

// open the MySQL connection
//connection.connect(error => {
//    if (error){
//        console.log("A error has been occurred "
//            + "while connecting to database.");
//        throw error;
//    }
//
//    //If Everything goes correct, Then start Express Server
//    app.listen(PORT, ()=>{
//        console.log("Database connection is Ready and "
//             + "Server is Listening on Port ", PORT);
//    })
//});

function {
    let score = document.getElementById("score_entry").value;    //get text box 

    let query = "INSERT INTO hi_score(" + score + ");";  //concat query with score
    console.log(query);     //log query for debug
    
    connection.query(query, function (err, result, fields) {
        if (err) throw err;
        else
            console.log(result);
    });
}

function loadScores() {
    let query = "SELECT json_object('name', name, 'score', score) FROM web.hi_score;"  //concat query with score
    console.log(query);     //log query for debug
    
    connection.query(query, function (err, result, fields) {
        if (err) throw err;
        else
            console.log(result);
    });
}

connection.end();
