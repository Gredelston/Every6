var models = require('../models/model-manager');
var utils = require('./utils');
var url = require('url');
var path = require('path');

var isLoggedIn = function(req) { return req.user; }

/* GET route to return what the logged-in user is reading right now */
module.exports.whatAmIReading = function(req, res) {
  var googleID = req.user.id;
  utils.readingByGoogleID(googleID, function(reading) {
    res.json(reading);
  });
}

/* GET route to return the logged-in user's previous reports */
module.exports.myReports = function(req, res) {
  var googleID = req.user.id;
  utils.reportsByGoogleID(googleID, function(reports) {
    res.json(reports);
  });
}