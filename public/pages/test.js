const connection = require('../../myapp.js');

function performQuery() {
    var query = document.getElementById("name_entry").value;    //get text box 
    document.getElementById("demo").innerHTML = query;

    console.log(query);     //log query for debug

    query = "SELECT * FROM hi_score WHERE SCORE=" + query   //concat query with score
    connection.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}


connection.end();