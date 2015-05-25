var express = require('express');
var path = require('path');
var logger = require('morgan'); // even though it's a rum, not a lager
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var index  = require('./routes/index');
var userInfo = require('./routes/userInfo');
var models = require('./models/model-manager');
var setupGoogleAuth = require('./routes/googleAuth');

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

setupGoogleAuth(app);

// Navigation routes
app.get('/'              , index.home);
app.get('/you'           , index.you);
app.get('/browse'        , index.browse);
app.get('/about'         , index.about);
app.get('/signupSuccess' , index.signupSuccess);

app.get('/signup'        , index.signupPage);
app.get('/validateEmail' , index.validateEmail)
app.get('/settings'      , index.profileSettings);
app.post('/createUser'   , index.createUser);

app.get('/whatAmIReading'    , userInfo.whatAmIReading);
app.get('/myReports'         , userInfo.myReports);

// Authentication routes
app.get('/auth/success'    , index.authSuccess);
app.get('/auth/failure'    , index.authFailure);
app.get('/loggedInDisplay' , index.loggedInDisplay);
app.get('/logout'          , index.logout);

// Ajax routes
app.get('/getGoogleUser', index.getGoogleUser);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/getPlaylist');
}

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});