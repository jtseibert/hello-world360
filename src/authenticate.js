
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
    oauth2 = require('simple-oauth2');

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
        clientID: '3MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP',
        clientSecret: '4299800700281945236',
        site: 'https://login.salesforce.com',
        authorizationPath: '/services/oauth2/authorize',
        tokenPath: '/services/oauth2/token',
        revocationPath: '/services/oauth2/revoke',
    };

var token;

// Initialize the OAuth2 Library
var oauth2 = oauth2(credentials);

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
        redirect_uri: 'https://hello-world360.herokuapp.com/callback',
        scope: 'full'
    });

// Callbacks
app.get('/callback', function (req, res) {

    console.log('Entered Callback');

    var code = req.query.code;

    console.log(code);

    oauth2.authCode.getToken({
        code: code,
        grant_type: 'authorization_code',
        client_ID: credentials.clientID,
        client_Secret: credentials.clientSecret,
        redirect_uri: 'https://hello-world360.herokuapp.com/callback'
    }, saveToken);

    function saveToken(error, result) {
        console.log('entered saveToken, result: ' + result.accessToken);
        if (error) { console.log('Access Token Error: ', error.message); }
        else { 
            console.log('Saving token');
            // result.expires_in = 2592000;
            token = oauth2.accessToken.create(result); 
        }
    }
    res.render('data');
});

// Initial page redirecting to Salesforce
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});
/************************************************/





/*************** For getting data ***************/
var options = {
        host: 'https://na30.salesforce.com',
        port: 443,
        path: '/services/data/v36.0/analytics/reports/00O36000005vYLW/describe',
        method: 'GET',
        headers: {
            'Authorization': 'OAuth2 ' + token,
            'Content-Type': 'application/json'
        }
    };

// Redirect to pull data from Salesforce
app.get('/getData', function (req, res) {

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





























