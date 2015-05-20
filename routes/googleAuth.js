var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var passportSetup = function(app) {
	// Google OAuth2 authentication via Passport
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
	    callbackURL: "/auth/callback",
	    passReqToCallback: true
	  },
	  function(request, accessToken, refreshToken, profile, done) {
	    console.log(profile);
	    var user = profile;
	    user.token = accessToken;
		return done(null, user);
	  }
	));
	app.use(passport.initialize());
	app.use(passport.session());
	app.get('/auth',
		passport.authenticate('google', {
			scope: ['profile']
		})
	);
	app.get('/auth/callback',
		passport.authenticate('google', {
			successRedirect: '/auth/success',
			failureRedirect: '/auth/failure'
		})
	);
}

module.exports = passportSetup;