var jsdom = require('jsdom');
var $ = require('jquery');
//******example 1*****
jsdom.env({
url: "https://www.allaboutbirds.org/guide/Northern_Cardinal/id",
scripts: ["http://code.jquery.com/jquery.js"],
done: function (errors, window) {
var $ = window.$;
console.log($("title").text());
}
});
//end example 1 *****
//data to be returned by salesforce
//hard code login url for now
var url = "https://login.salesforce.com/services/oauth2/token"
var access_token;
var instance_url;
var id;
var issued_at;
var signature;

//send POST request to salesforce and populate data
function ajaxRequest(url, postData, callback) {
	console.log('ajaxRequest called');
    $.ajax({
	    url: url,
	    type: "POST",
	    data: postData,
	    dataType: 'json',
	    success: callback
	});
}

//sets the above data returned from salesforce login
function authenticate(url, clientID, clientSecret, username, password) {
	console.log('authenticate called');
	var postURL = "grant_type=password&client_id=" + clientID
					+ "&client_secret=" + clientSecret
					+ "&username=" + username
					+ "&password=" + password;
	ajaxRequest(url, postURL, function(responseData) {
		access_token = responseData.access_token;
		instance_url = responseData.instance_url;
		id = responseData.id;
		issued_at = responseData.issued_at;
		signature = responseData.signature;

		var str = JSON.stringify(responseData, null, 2);
	});
}

//call the functions
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
/*
var testt = function($) {
	$.ajax({
		url: instance_url,
		type: "POST",
		data: "services/data/",
		authorization: "Bearer " + access_token,
		success: function(responseData) {
			res.send(responseData.stringify());
		}
	});
}; */




	