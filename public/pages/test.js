//const connection = require('../../myapp.js');

function performQuery(value) {
    var query = document.getElementById("score_entry").value;    //get text box 
    document.getElementById("demo").innerHTML = query;

    console.log(query);     //log query for debug

    query = "INSERT INTO hi_score" + value + "hi_score;"  //concat query with score
    console.log(query);     //log query for debug
    
    connection.query(query, function (err, result, fields) {
        if (err) throw err;
        else
            console.log(result);
    });
}

//connection.end();