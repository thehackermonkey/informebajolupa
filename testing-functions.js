var express = require('express');
var app = express();
///// TABLETOP stuff
var constructURL = function(spreadsheetIdendifier){
	return 'https://docs.google.com/spreadsheets/u/1/d/'+spreadsheetIdendifier+'/pubhtml';
};

var tabletop = require('tabletop'),
	gdlURL = '19F4xqdTfV1Xse0DF0g3lLFrLFkV43agtCJNhBAu9HgM',
	ecatepecURL = constructURL('1DbdmXzv1udHddfCkSC_FdF9OihNL84no4hpUaiX9F3c');
var gdldata, zapdata, ecatepecdata;

// trying a global getData function
// function getData(keyURL,dataname){
// 	tabletop.init( {
// 		 key: keyURL,
// 		 callback: function(data){dataname = data; console.log(dataname);},
// 		 simpleSheet: true
// 	});
// };


function getData(keyURL, varDataName) {
    tabletop.init( {
        key: keyURL,
        callback: function returnData(data) {
		      varDataName = data;
		  },
        simpleSheet: true
    });
}

getData(function(keyURL, varDataName){
	tabletop.init( {
		 key: keyURL,
		 callback: function returnData(data) {
			  varDataName = data;
		 },
		 simpleSheet: true
	});
})

// function returnData(data) {
// 	 varDataName = data;
// }

getData(gdlURL, gdldata)


console.log(gdldata);
