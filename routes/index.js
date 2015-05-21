var url = require('url');
var path = require('path');

// GET functions

/* Renders the homepage (/) */
module.exports.home = function(req, res) {
  res.render('home');
};

module.exports.thisPeriod = function(req, res) {
	res.render('thisPeriod');
}

module.exports.pastPeriods = function(req, res) {
	res.render('pastPeriods');
}

module.exports.about = function(req, res) {
	res.render('about');
}

/**
 * GET request to return the logged-in Google ID, if logged in.
 */
module.exports.getGoogleUser = function(req, res) {
	if (req.user) {
		console.log("getGoogleUser: ", req.user.displayName);
		res.json(req.user);
	} else {
		res.end(null);
	}
}

/* If logged in, log out. Otherwise, log in. */
module.exports.logInOrOut = function(req, res) {
	if (req.user) {
		res.redirect('/logout');
	} else {
		res.redirect('/auth');
	}
}

/* Log out of Google OAuth. */
module.exports.logout = function(req, res) {
	console.log("Logging out");
	req.logout();
	res.redirect('/');
}

module.exports.loggedInDisplay = function(req, res) {
	res.render('partials/loggedInDisplay', {
		imgURL: req.user._json.image.url,
		displayName: req.user.displayName,
		layout: false
	});
}

/* Callback for a successful Google authentication. */
module.exports.authSuccess = function(req, res) {
  console.log("SUCCESSFUL SUCCESS!!!!");
  res.redirect('/');
}

/* Callback for a failed Google authentication. */
module.exports.authFailure = function(req, res) {
  console.log("FAILURE TO FAIL!!!!!");
  res.redirect('/');
}