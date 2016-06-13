
/**************** Just for reference *************
var url = 'https://login.salesforce.com/services/oauth2/token',
    clientID = "3MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP",
    clientSecret = "4299800700281945236",
    username = "jacobseibert@magnet360.com",
    password = "Zedc3093";
*************************************************/





/******************* Requires *******************/
var express = require('express'),
    app = express(),
    request = require('request'),
    https = require('https'),
    http = require('http'),
    oauth2 = require('simple-oauth2'),
    options;

// var url =  'https://na30.salesforce.com/services/data',
//     theHost = 'https://na30.salesforce.com',
//     thePath = '/services/data';
/*************************************************/





/*************** For setting up the server ******/
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');

// Directs to main page
app.get('/', function (req, res) {
    res.render('main');
});

// Directs to data page
app.get('/data', function (req, res) {
    res.render('data');
});

app.listen(process.env.PORT || 5000);

console.log('Express server started on port 5000');
/************************************************/





/* For oauth2 authentication and token handling */
// Set the configuration settings
var credentials = {
        clientID: '3MVG9uudbyLbNPZMn2emQiwwmoqmcudnURvLui8uICaepT6Egs.LFsHRMAnD00FSog.OXsLKpODzE.jxi.Ffu',
        clientSecret: '625133588109438640',
        site: 'https://login.salesforce.com',
        authorizationPath: '/services/oauth2/authorize',
        tokenPath: '/services/oauth2/token',
    };

var token;
var options;

// Initialize the OAuth2 Library
var oauth2 = oauth2(credentials);

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
        redirect_uri: 'https://hello-world360.herokuapp.com/callback',
        scope: 'full'
    });

// Callbacks
app.get('/callback', function (req, res) {
<<<<<<< HEAD
	console.log('got to /callback');
=======

    console.log('Entered Callback');

>>>>>>> 77e27b57a1583d055f2609df841712843c61feef
    var code = req.query.code;

    console.log(code);

    oauth2.authCode.getToken({
        code: code,
<<<<<<< HEAD
        grant_type: 'authorization_uri',
        client_id: credentials.clientID,
        client_secret: credentials.clientSecret,
=======
        grant_type: 'authorization_code',
        client_ID: credentials.clientID,
        client_Secret: credentials.clientSecret,
>>>>>>> 77e27b57a1583d055f2609df841712843c61feef
        redirect_uri: 'https://hello-world360.herokuapp.com/callback'
    }, saveToken);

    function saveToken(error, result) {
<<<<<<< HEAD
    	console.log('entering saveToken');
        if (error) { console.log('Access Token Error', error.message); }
        token = oauth2.accessToken.create(result);
        console.log('token is: ' + JSON.stringify(token));
        console.log('populating options');
        
        options = {
	        host: 'this is a host string',
	        port: 443,
	        path: '/services/data/v36.0/analytics/reports/00O36000005vYLW/describe',
	        method: 'GET',
	        headers: {
	            'Authorization': 'Bearer ' + 'this is a token test',
	            'Content-Type': 'application/json'
	        }
	    };

	    console.log(JSON.stringify(options));
    }

=======
        console.log(JSON.stringify(result));
        if (error) { console.log('Access Token Error: ', error.message); }
        else { 
            console.log('Saving token');
            // result.expires_in = 2592000;
            token = oauth2.accessToken.create(result); 
        }
    }
    options = {
        host: 'https://na30.salesforce.com',
        port: 443,
        path: '/services/data/v36.0/analytics/reports/00O36000005vYLW/describe',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    };
>>>>>>> 77e27b57a1583d055f2609df841712843c61feef
    res.render('data');
});

// Initial page redirecting to Salesforce
app.get('/auth', function (req, res) {
	console.log('entering /auth, calling res.redirect(authorization_uri');
    res.redirect(authorization_uri);
});
/************************************************/





/*************** For getting data ***************/
// Redirect to pull data from Salesforce
app.get('/getData', function (req, res) {
<<<<<<< HEAD
	console.log('entering getData');

	function getJSON(options, onResult){
	    console.log("entering getJSON");

	    var prot = options.port == 443 ? https : http;
	    var req = prot.request(options, function(res)
	    {
	        var output = '';
	        console.log(options.host + ':' + res.statusCode);
	        res.setEncoding('utf8');

	        res.on('data', function (chunk) {
	            output += chunk;
	        });

	        res.on('end', function(res) {
	            var obj = JSON.parse(output);
	            onResult(res.statusCode, obj);
	        });
	    });

	    req.on('error', function(err) {
	        res.send('error: ' + err.message);
	    });

	    req.end();
	};
	//Call *****
=======

    console.log('Entered getData');

    function getJSON(options, onResult){
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function(res) {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });

    req.end();
};

>>>>>>> 77e27b57a1583d055f2609df841712843c61feef
    getJSON(options,
        function(statusCode, result)
        {
            // I could work with the result html/json here.  I could also just return it
            console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
            res.statusCode = statusCode;
            res.send(result);
        });
});
/************************************************/





























