var url = require('url');
var path = require('path');

// GET functions

/* Renders the homepage (/) */
var home = function(req, res) {
  res.render('home');
};


/* Callback URI for when the user is logged in. */
var authSuccess = function(req, res) {
  console.log("SUCCESSFUL SUCCESS!!!!", __dirname);
  res.redirect('/');
}

var authFailure = function(req, res) {
  console.log("FAILURE TO FAIL!!!!!");
  res.redirect('/');
}

module.exports.home = home;
module.exports.authSuccess = authSuccess;
module.exports.authFailure = authFailure;