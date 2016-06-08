var express = require('express');
var $ = require('jquery');


var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
	res.send('Hello World!\n');
	res.send('Begin Authentication');

	/**************** Begin REST API attempt **********************************

	var access_token;
	var instance_url;
	var id;
	var issued_at;
	var signature;



	function authenticate(clientID, clientSecret, username, password){

		var postURL = "grant_type=password&client_id=" + clientID
						+ "&client_secret=" + clientSecret
						+ "&username=" + username
						+ "&password=" + password;
		//var test = function($){
		    $.ajax({
		        url: "https://login.salesforce.com/services/oauth2/token",
		        type: "POST",
		        data: postURL,
		        success: function(responseData){
		        	access_token = responseData.access_token;
		        	instance_url = responseData.instance_url;
		        	id = responseData.id;
		        	issued_at = responseData.issued_at;
		        	signature = responseData.signature;
		        }
			});
		//};
	}

	var initParameters = {
		clientID: "MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP",
		clientSecret: "4299800700281945236",
		username: "jacobseibert@magnet360.com",
		password: "Zedc3093"
	};

	authenticate(initParameters.clientID,
					initParameters.clientSecret,
					initParameters.username,
					initParameters.password);
	//var testt = function($){
		$.ajax({
			url: instance_url,
			type: "POST",
			data: "services/data/",
			authorization: "Bearer " + access_token,
			success: function(responseData){
				res.send(responseData.stringify());
			} 
		});
	//};

	/********************** End REST API attempt *****************************/
	res.send('Bye World!');

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
