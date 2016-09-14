var express = require('express');
var app = express();

///// GOOGLE SHEET STUFF
var tabletop = require('tabletop');
var googleURL= "https://docs.google.com/spreadsheets/u/1/d/19F4xqdTfV1Xse0DF0g3lLFrLFkV43agtCJNhBAu9HgM/pubhtml";
var sheetdata, zapdata;

//Get spreadsheet data
function checkGDL() {
  tabletop.init( { key: googleURL,
                   callback: returnGDL,
                   simpleSheet: true } )
};
// function checkZPN() {
//   tabletop.init( { key: googleURL,
//                    callback: returnZPN,
//                    simpleSheet: true } )
// };


function returnGDL(data, tabletop) {
    console.log(data);
    sheetdata = data;
}
// function returnZPN(data, tabletop){
//     zapdata = data;
// }

//look for changes on the spreadsheet and keep looking every minute
checkGDL();
// checkZPN();
setInterval(checkGDL, 60000);
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
