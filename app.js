var express = require('express');
var path = require('path');
var logger = require('morgan'); // even though it's a rum, not a lager
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var index  = require('./routes/index');
var models = require('./models/model-manager');

var app = express();

// Application settings
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

// Routes

app.get('/', index.home);
app.get('/login', index.login);
app.get('/loggedIn', index.loggedIn);

app.post('/loginSubmit', index.loginSubmit);
app.post('/logoutSubmit', index.logoutSubmit);
app.post('/newTwote', index.newTwote);

app.delete('/deleteTwote', index.deleteTwote);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});