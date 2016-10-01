//express
var express = require('express');
var app = express();
var oneDay = 86400000;
///// TABLETOP stuff
var tabletop = require('tabletop'),
    gdlURL= 'https://docs.google.com/spreadsheets/u/1/d/19F4xqdTfV1Xse0DF0g3lLFrLFkV43agtCJNhBAu9HgM/pubhtml',
    zapURL= 'https://docs.google.com/spreadsheets/u/1/d/1CMTFGw3eTFDtoEaz8QAH4u9y5H3wKaUMt29K5YAoZhY/pubhtml?gid=0&single=true';
var gdldata, zapdata;

//Get Guadalajara data
function checkGDL() {
    tabletop.init( {
        key: gdlURL,
        callback: returnGDL,
        simpleSheet: true
    });
}
function returnGDL(data) {
    gdldata = data;
}

//Get zapopan data
function checkZPN() {
    tabletop.init( {
        key: zapURL,
        callback: returnZPN,
        simpleSheet: true
    });
}
function returnZPN(data){
    zapdata = data;
}

//look for changes on the spreadsheet and keep looking every minute
checkGDL();
checkZPN();
setInterval(checkGDL, 60000);
setInterval(checkZPN, 180000);

///END TABLETOP CODE

app.use('/src', express.static(__dirname + '/src', { maxAge: oneDay }));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index', {
        gdldata: gdldata,
        zapopandata: zapdata
    });
});

app.get('/zapopan', function (req, res) {
    res.render('zapopan', {data: zapdata});
});

app.get('/guadalajara', function (req, res) {
    res.render('guadalajara', {data: gdldata});
});

app.get('/acerca', function (req, res) {
    res.render('acerca');
});


app.listen(process.env.PORT || 5000, function () {
    // console.log('Ejecutando #informebajolupa');
});
