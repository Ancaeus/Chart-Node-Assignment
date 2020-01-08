/*

*/

/*Step 1 : Loading All dependencies.*/
var express	=	require('express');
var app		=	express();
var http=require('http');
var htmlparser = require("htmlparser");
jsdom = require('jsdom');
//var mysql	=	require('mysql');
var request = require('request');
const fs = require('fs');
var date = new Date();
var timestamp = date.getTime();
var path = require('path');

const filePath = 'c:\\Test\\test.txt'

var inputPath = path.join(__dirname, 'cfg-files', 'server.txt');
var dataURL = fs.readFileSync(inputPath, 'utf8');
	
	
	console.log(dataURL.toString());
  


function getTimeStamp() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' +
            (now.getDate()) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
}



app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/',function(req,res){
	
	res.render('test.html');

});

/*
	* Here we are loading every content from data base and sending it back to Client in JSON format.
	* We cannot send it without JSON because Angular do not understand raw data.
*/

	 
app.get('/load',function(req,res){
	var newTimeStamp = getTimeStamp();
	
	
	request(dataURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {

		
		

		  console.log(body);

			
		
		
		
		
		 // var temp = $('<div id="VoltageValue"></div>').data();
	
		
		// var objRef = document.body;
		  //console.log(response);
		  res.end(JSON.stringify({values:{ time: newTimeStamp, value: body}})); 
		  //res.end(JSON.stringify({data: body}));
		  
		var fileContent = newTimeStamp + " " + " "+  body + "\r\n" ;
		fs.appendFileSync(filePath, fileContent, (err) => {
			
		console.log("The file was succesfully saved!");
			if (err) throw err;
			
		
		}); 
		
			
		
	
		}
		else {
			if (typeof response !== 'undefined' || typeof reponse !=='undefined') {
				console.log("Error "+response.statusCode);
				const fd = fs.appendFileSync(filePath, fileContent + "\r\n")
				
				console.log(body);
				//res.json({ voltage: body });
			 } else{		  
		  console.log('Server Down! No Response');
			 }
			}
	  })
	console.log("<== We are going to load data from Device ==>");


});

/*Starting our app at localhost with PORT 7001.*/
app.listen(7001,function(){
		console.log("<== App is started at PORT 7001 ==>");
});
