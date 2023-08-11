//const connection = require('../../myapp.js');

function insertScore() {
    let score = document.getElementById("score_entry").value;    //get text box 

    let query = "INSERT INTO hi_score(" + score + ");"  //concat query with score
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

//connection.end();