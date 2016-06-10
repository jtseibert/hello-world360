// var url = 'https://login.salesforce.com/services/oauth2/token',
//     clientID = "MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP",
//     clientSecret = "4299800700281945236",
//     username = "jacobseibert@magnet360.com",
//     password = "Zedc3093";

var express = require('express'),
    app = express();

app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');

var oauth2 = require('simple-oauth2')({
  clientID: "3MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP",
  clientSecret: "4299800700281945236",
  site: 'https://login.salesforce.com/services/',
  tokenPath: 'oauth2/token',
  authorizationPath: 'oauth2/authorize'
});

var dataPost = {
        host: 'https://na30.salesforce.com',
        port: (process.env.PORT || 5000),
        path: '/services/data/v35.0/analytics/reports/00O36000005vYLWMAK/describe',
        method: 'GET',
        headers: {
            'Authorization': access_token
        }
    },
    access_token;

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'https://hello-world360.herokuapp.com/data',
  scope: 'full',
});

// Initial page redirecting to Github
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});

// Initial page redirecting to Github
app.get('/getData', function (req, res) {
    res.redirect(dataPost);
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


