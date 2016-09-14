var express = require('express');
var app = express();

///// GOOGLE SHEET STUFF
var tabletop = require('tabletop');
var googleURL= "https://docs.google.com/spreadsheets/d/1iU0TQN714b_3dppZtddGwl7CLhErhEENwZ5hCutoJ8M/pubhtml";
var sheetdata;

//Get spreadsheet data
function init() {
  tabletop.init( { key: googleURL,
                   callback: showInfo,
                   simpleSheet: true } )
};
function showInfo(data, tabletop) {
    sheetdata = data;
}

//look for changes on the spreadsheet and keep looking every minute
init();
setInterval(init, 60000);
///END GOOGLE SHEET


app.use("/src", express.static(__dirname + '/src'));
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/zapopan', function (req, res) {
  res.render('zapopan', {data: sheetdata});
});

app.get('/guadalajara', function (req, res) {
  res.render('guadalajara', {data: sheetdata});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
