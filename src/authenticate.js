
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
    oauth2 = require('simple-oauth2')
    async = require('async'),
    bufferJson = require('buffer-json');


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
        revokePath: '/services/oauth2/revoke'
    };

var token;
var options,
    hostURL;

// Initialize the OAuth2 Library
var oauth2 = oauth2(credentials);

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
        redirect_uri: 'https://hello-world360.herokuapp.com/callback',
        scope: 'full'
    });

// Callbacks
app.get('/callback', function (req, res) {
	console.log('got to /callback');
    var code = req.query.code;

    oauth2.authCode.getToken({
        code: code,
        grant_type: 'authorization_uri',
        client_id: credentials.clientID,
        client_secret: credentials.clientSecret,
        redirect_uri: 'https://hello-world360.herokuapp.com/callback'
    }, saveToken);

    function saveToken(error, result) {
    	console.log('entering saveToken');
        if (error) { console.log('Access Token Error', error.message); }
        token = oauth2.accessToken.create(result);
        
        hostURL = token.token.instance_url.replace('https://', '');

        options = {
	        host: hostURL,
	        port: 443,
	        path: '/services/data/v35.0/analytics/reports/00Oa0000008r7sg',
	        method: 'GET',
	        headers: {
	            'Authorization': 'Bearer ' + token.token.access_token,
	            'Content-Type': 'application/json'
	        }
	    };
    }

    res.render('data');
});

// Initial page redirecting to Salesforce
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});
/************************************************/


var data = "";
var label = "hi"


/*************** For getting data ***************/
// Redirect to pull data from Salesforce
app.get('/getData', function (req, res) {
    async.waterfall([
        function(callback) {
            var req = https.request(options, function(res){
                res.on('data', function(d){
                    data += d;
                });

                res.on('error', (e) => {
                    console.log('Error found');
                    console.error(e);
                });

                res.on('end', function(res) {
                    console.log('ENTER IF DATA, PRINTING DATA');
                    data = JSON.parse(data.toString('utf-8'));
                    console.log(data.factMap["T!T"].aggregates[0].label);
                    label = data.factMap["T!T"].aggregates[0].label
                    console.log('label: ' + label)
                });      
            })
            req.end();
            callback(null,label)
        },
        function(arg1,callback){
            res.send(label)
            callback(null, 'done')
        }
    ], function (err, result) {
        // result now equals done
    })    
});
/************************************************/





























