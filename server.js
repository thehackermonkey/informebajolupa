//express
var express = require('express');
var app = express();
var oneDay = 86400000;
var here = this;
///// TABLETOP stuff


var tabletop = require('tabletop'),
	gdlURL = '19F4xqdTfV1Xse0DF0g3lLFrLFkV43agtCJNhBAu9HgM',
	zapURL = '1CMTFGw3eTFDtoEaz8QAH4u9y5H3wKaUMt29K5YAoZhY',
	ecatepecURL = '1DbdmXzv1udHddfCkSC_FdF9OihNL84no4hpUaiX9F3c',
	naucalpanURL = '1pmaUoAOn_j2EuIEZKi10PZ5_m00q5jB6WrX0TkP38n4',
	tolucaURL = '1-JZg1hX8OIe9cDB6hHKdsTClUBMZhyC16iw0QFsg5Cs',
	gdldata, zapdata, ecatepecdata, tolucadata, naucalpandata;

//get GDL
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


//Get ecatepec data
function checkEcatepec() {
    tabletop.init( {
        key: ecatepecURL,
        callback: returnEcatepec,
        simpleSheet: true
    });
}
function returnEcatepec(data){
    ecatepecdata = data;
}
//check naucalpan
function checkNaucalpan() {
    tabletop.init( {
        key: naucalpanURL,
        callback: returnNaucalpan,
        simpleSheet: true
    });
}
function returnNaucalpan(data){
    naucalpandata = data;
}
//check toluca
function checkToluca() {
    tabletop.init( {
        key: tolucaURL,
        callback: returnToluca,
        simpleSheet: true
    });
}
function returnToluca(data){
    tolucadata = data;
}





//look for changes on the spreadsheet and keep looking every minute
checkGDL();
checkZPN();
checkEcatepec();
checkNaucalpan();
checkToluca();
setInterval(checkGDL, 60000)
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

app.get('/ecatepec', function (req, res) {
    res.render('ecatepec', {data: ecatepecdata});
});

app.get('/toluca', function (req, res) {
    res.render('toluca', {data: tolucadata});
});

app.get('/naucalpan', function (req, res) {
    res.render('naucalpan', {data: naucalpandata});
});

app.get('/acerca', function (req, res) {
    res.render('acerca');
});


app.listen(process.env.PORT || 5000, function () {
    // console.log('Ejecutando #informebajolupa');
});
