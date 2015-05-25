var models = require('../models/model-manager');
var queries = require('../models/queries');
var url = require('url');
var path = require('path');

var isLoggedIn = function(req) { return req.user; }

/* GET route to return what the logged-in user is reading right now */
module.exports.whatAmIReading = function(req, res) {
  var googleID = req.user.id;
  queries.readingByGoogleID(googleID, function(reading) {
    res.json(reading);
  });
}

/* GET route to return the logged-in user's previous reports */
module.exports.myReports = function(req, res) {
  var googleID = req.user.id;
  queries.reportsByGoogleID(googleID, function(reports) {
    res.json(reports);
  });
}

/* GET route to return what a particular user is reading right now */
module.exports.readingByGoogleID = function(req, res) {
  var googleID = req.query.googleID;
  console.log(googleID);
  queries.readingByGoogleID(googleID, function(reading) {
    res.json(reading);
  });
}

/* GET route to return what a particular user's previous reports */
module.exports.reportsByGoogleID = function(req, res) {
  var googleID = req.query.googleID;
  queries.reportsByGoogleID(googleID, function(reports) {
    res.json(reports);
  });
}