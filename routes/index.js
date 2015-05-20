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
	console.log("getGoogleUser: ", req.user);
	if (req.user) {
		res.json(req.user);
	} else {
		res.end(null);
	}
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
module.exports.getGoogleUser = getGoogleUser;