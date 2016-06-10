// var url = 'https://login.salesforce.com/services/oauth2/token',
//     clientID = "MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP",
//     clientSecret = "4299800700281945236",
//     username = "jacobseibert@magnet360.com",
//     password = "Zedc3093";

var express = require('express'),
    app = express(),
    request = require('request'),
    https = require('https'),
    http = require('http');
    

app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');

var oauth2 = require('simple-oauth2')({
  clientID: "3MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP",
  clientSecret: "4299800700281945236",
  site: 'https://login.salesforce.com/services/',
  tokenPath: 'oauth2/token',
  authorizationPath: 'oauth2/authorize'
});
var url =  'https://na30.salesforce.com/services/data',
    theHost = 'https://na30.salesforce.com',
    thePath = '/services/data';

var options = {
    host: 'na30.salesforce.com',
    port: 443,
    path: '/services/data/v36.0/analytics/reports/00O36000005vYLW/',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'
    }
};

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'https://hello-world360.herokuapp.com/data',
  scope: 'full',
});

// Initial page redirecting to Github
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});

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

// Initial page redirecting to Github
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

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
  var code = req.query.code;

  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'http://localhost:5000/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth2.accessToken.create(result);
    access_token = token;
  }
});

app.get('/', function (req, res) {
  res.render('main');
});

app.get('/data', function (req, res) {
  res.render('data');
});

app.listen(process.env.PORT || 5000);

console.log('Express server started on port 5000');


