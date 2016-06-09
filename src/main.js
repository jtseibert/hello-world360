var express = require('express'),
	app = express();


app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('main');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


