var jquery = require('jquery-1.12.4.js');

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
}