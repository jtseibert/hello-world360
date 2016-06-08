var express = require('express');
var jquery = require('jquery-1.12.4.js');
var authenticate = require('authenticate.js');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/**************** Begin REST API attempt **********************************/

var initParameters = {
	clientID: "MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP",
	clientSecret: "4299800700281945236",
	username: "jacobseibert@magnet360.com",
	password: "Zedc3093"
};

authenticate(clientID,clientSecret,username,password);

$.ajax({
	url: instance_url,
	type: "POST",
	data: "services/data/",
	authorization: "Bearer " + access_token,
	success: function(responseData){
		res.send(responseData.stringify());
	} 
});