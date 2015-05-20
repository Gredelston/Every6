var url = require('url');
var path = require('path');

// GET functions

/* Renders the homepage (/) */
var home = function(req, res) {
  res.render('home');
};

/**
 * GET request to return the logged-in Google ID, if logged in.
 */
var getGoogleUser = function(req, res) {
	if (req.user) {
		console.log("getGoogleUser: ", req.user.displayName);
		res.json(req.user);
	} else {
		console.log("No user logged in");
		res.end(null);
	}
}

var logInOrOut = function(req, res) {
	if (req.user) {
		res.redirect('/logout');
	} else {
		res.redirect('/auth');
	}
}

var loggedInDisplay = function(req, res) {
	res.render('partials/loggedInDisplay', {
		imgURL: req.user._json.image.url,
		displayName: req.user.displayName,
		layout: false
	});
}

var logout = function(req, res) {
	console.log("Logging out");
	req.logout();
	res.redirect('/');
}

/* Callback for a successful Google authentication. */
var authSuccess = function(req, res) {
  console.log("SUCCESSFUL SUCCESS!!!!");
  res.redirect('/');
}

/* Callback for a failed Google authentication. */
var authFailure = function(req, res) {
  console.log("FAILURE TO FAIL!!!!!");
  res.redirect('/');
}

module.exports.home = home;
module.exports.authSuccess = authSuccess;
module.exports.authFailure = authFailure;
module.exports.logout = logout;
module.exports.getGoogleUser = getGoogleUser;
module.exports.logInOrOut = logInOrOut
module.exports.loggedInDisplay = loggedInDisplay