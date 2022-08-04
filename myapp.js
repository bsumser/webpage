var express = require("express");
var app = express();

app.use(express.static('public'));

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});


var secret = "brexie,87125"; //secret variable for github webhook
//var repo = "/";	//project dir

let http = require('http');	//webserver for hashing secret
let crypto = require('crypto');
const exec = require('child_process').exec;	//child process to handle git pull

http.createServer(function (req, res) {	//start web server on port 8080
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            exec('git pull');
        }
    });

    res.end();
}).listen(8080);

