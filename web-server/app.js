var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var methodOverride = require('method-override');

var fs = require('fs');

var options = {
	key: fs.readFileSync('../shared/server.key'),
	cert: fs.readFileSync('../shared/server.crt')
};

var app = express();

app.set('view engine', 'html');
app.set('views', __dirname + '/public');
app.set('view options', {layout: false});
app.set('basepath',__dirname + '/public');

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development'){
	app.use(express.static(__dirname + '/public'));
	app.use(errorhandler({
		dumpExceptions: true,
		showStack: true
	}));
} else {
	var oneYear = 31557600000;
	app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
	app.use(errorhandler());
}
console.log("Web server has started.\nPlease log on https://127.0.0.1:3001/index.html");

var httpsServer = https.createServer(options, app);

httpsServer.listen(3001);