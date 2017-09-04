//express
var express = require('express'),
	app = express(),
	oneDay = 86400000,
	halfHour = 1800000,
	tabletop = require('tabletop');

//GOOGLE SPREADSHEETS WHIT THE FACT CHECK OF EACH TOWN
var spreadsheets = {
	jalisco: '1ZezQRrxGSrSOSfeFuyyI-8wEga85BuKM8uPm2cnd1X0',
	guadalajara : '19F4xqdTfV1Xse0DF0g3lLFrLFkV43agtCJNhBAu9HgM',
	zapopan : '1CMTFGw3eTFDtoEaz8QAH4u9y5H3wKaUMt29K5YAoZhY',
	ecatepec : '1DbdmXzv1udHddfCkSC_FdF9OihNL84no4hpUaiX9F3c',
	naucalpan : '1pmaUoAOn_j2EuIEZKi10PZ5_m00q5jB6WrX0TkP38n4',
	toluca : '1-JZg1hX8OIe9cDB6hHKdsTClUBMZhyC16iw0QFsg5Cs'
};

// Check all spreadsheets, get the data and then send it to the view manager
function checkAllData(sheets, call){

	var keys = Object.keys(sheets);
	var x = 0;
	var actualkey = keys[x];

//Check every single spreadsheet and get the data before rendering de website
	checkSpreadSheets(sheets)

	function checkSpreadSheets(sheets) {

		console.log('obteniendo datos de: ' + actualkey);

		//executes getdata
		getData(sheets[actualkey], function(){
			x++;
			actualkey = keys[x];
			if(x < keys.length) {
				checkSpreadSheets(sheets);
			}
			else {
				call(sheets);
			}
		})
	}//end check each spreadsheet

	//GETDATA function (tabletop async request)
	function getData(municipio, callingback){
		tabletop.init( {
			key: municipio,
			simpleSheet: true,
			callback: data => {
				console.log('Datos conseguidos con éxito');
				sheets[actualkey] = data;
				callingback();
			}
		});
	}//end getData
}// check all data end

//CHECKS FOR NEW INFO EVERY DAY
checkAllData(spreadsheets, setViews);
setInterval(() => {
	checkAllData(spreadsheets, setViews)
}, halfHour);

//SET VIEWS
function setViews(data){

	app.use('/src', express.static(__dirname + '/src', { maxAge: oneDay }));
	app.set('view engine', 'pug');

	app.get('/', function (req, res) {
		res.render('index', {
			data: data,
			header: "inicio"
		})
	});

	app.get('/acerca', function (req, res) {
		res.render('acerca');
	});

	// dynamic routing
	app.get('/:municipio', function (req, res) {
		var municipio = req.params.municipio;
		if(!data[municipio]){
			res.send('404: Not found')
		}
		if(municipio == 'jalisco'){
			res.render('ejes_header', {
			data: data[municipio],
			header: municipio
			})
		}
		else{
			res.render('results_template', {
			data: data[municipio],
			header: municipio
		});
		}
		
	});

	app.get('/api/:municipio', function (req, res) {
		var municipio = req.params.municipio;
		if(!data[municipio]){
			res.send('404: Not found')
		}
		res.send(data[municipio]);
	});

	app.listen(process.env.PORT || 5000, function () {
		 console.log('#informebajolupa en funcionamiento');
	});

}
