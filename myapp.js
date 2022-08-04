var express = require("express");
var app = express();

app.use(express.static('public'));

var server = app.listen(3000, (error), function(){
    var port = server.address().port;

    if (!error)
        console.log("Server started at http://localhost:%s", port);
    else
        console.log("Error occurred, server cant start", error)
});

