var url = require('url');
var path = require('path');

// GET functions

/* Renders the homepage (/) */
var home = function(req, res) {
  res.render('home');
};

module.exports.home = home;