var express = require('express');
var path = require('path');
var logger = require('morgan'); // even though it's a rum, not a lager
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var index  = require('./routes/index');
var models = require('./models/model-manager');

var app = express();
var appDir = path.dirname(require.main.filename);
console.log(appDir);

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

// Google OAuth2 authentication
var GOOGLE_CLIENT_ID = process.env.GOOGLE_KEY;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth2callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    var user = profile;
    user.token = accessToken;
	return done(null, user);
  }
));


// Routes
app.get('/', index.home);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});