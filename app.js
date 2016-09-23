var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = require('./routes/router.js');
var nunjucks = require('nunjucks');
var path = require('path');

var models = require('./models');

var app = express(), PORT = 3000;

app.use('/', router);

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// define static rsc
app.use(express.static(path.join(__dirname, '/public')));

// sync with both User and Page databases
// when sync'd, start listening to requests!
Promise.all([models.User.sync(), models.Page.sync()])
	.then(()=>{
		console.log("DB successfully synchronized");

		app.listen(PORT, ()=>{
			console.log("Server launched and listening on PORT", PORT);
		})	
	})
	.catch(err => console.error(err));


