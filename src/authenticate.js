
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
    simple_oauth2 = require('simple-oauth2');

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
var credentials = {
      clientID: '3MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP',
      clientSecret: '4299800700281945236',
      site: 'https://login.salesforce.com/services/oauth2/token'
    };

var token,
    tokenConfig = {
        code: '<code>',
        redirect_uri: 'http://localhost:3000/callback'
    };

// Initialize the OAuth2 Library
var oauth2 = simple_oauth2(credentials);

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
        redirect_uri: 'https://hello-world360.herokuapp.com/data',
        scope: 'full'
    });

// Initial page redirecting to Salesforce
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});

// Promises
// Save the access token
oauth2.authCode.getToken(tokenConfig)
    .then(function saveToken(result) {
        token = oauth2.accessToken.create(result);
    })
    .catch(function logError(error) {
        console.log('Access Token Error', error.message);
    });
/************************************************/





/*************** For getting data ***************/
var options = {
        host: 'na30.salesforce.com',
        port: 443,
        path: '/services/data/v36.0/analytics/reports/00O36000005vYLW/',
        method: 'GET',
        headers: {
            'Authorization': ('Bearer ' + token),
            'Content-Type': 'application/json'
        }
    };

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

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });

    req.end();
};

// Redirect to pull data from Salesforce
app.get('/getData', function (req, res) {
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





























