var express = require('express');
var app = express();

///// GOOGLE SHEET STUFF
var tabletop = require('tabletop');
var googleURL= "https://docs.google.com/spreadsheets/d/1iU0TQN714b_3dppZtddGwl7CLhErhEENwZ5hCutoJ8M/pubhtml";
var sheetdata, zapdata;

//Get spreadsheet data
function checkGDL() {
  tabletop.init( { key: googleURL,
                   callback: returnGDL,
                   simpleSheet: true } )
};
function checkZPN() {
  tabletop.init( { key: googleURL,
                   callback: returnZPN,
                   simpleSheet: true } )
};


function returnGDL(data, tabletop) {
    sheetdata = data;
}
// function returnZPN(data, tabletop){
//     zapdata = data;
// }

//look for changes on the spreadsheet and keep looking every minute
checkGDL();
// checkZPN();
setInterval(checkGDL, 120000);
// setInterval(checkZPN, 180000);
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


app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 3000!');
});
