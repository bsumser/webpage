const express = require('express');
const fs = require('fs');
const { engine } = require('express-handlebars');
const app = express();
app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

//app.get('./graphJSON.json', (req, res, next) => {
//    fs.readFile('./graphJSON.json', (err, data) => {
//        if (err) {
//            next(err)
//        }else {
//            res.json(data)
//        }
//    })
//});

//fs.readFile('./public/pages/graphJSON.json', (err, data) => {
//    if (err) throw err;
//    let graphData = JSON.parse(data);
//    console.log(graphData);
//});

console.log('This is after the read call');

app.listen(3000);
