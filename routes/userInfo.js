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

/* GET route to return the logged-in user's previous reflections */
module.exports.myReflections = function(req, res) {
  var googleID = req.user.id;
  queries.reflectionsByGoogleID(googleID, function(reflections) {
    res.json(reflections);
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

/* GET route to return what a particular user's previous reflections */
module.exports.reflectionsByGoogleID = function(req, res) {
  var googleID = req.query.googleID;
  queries.reflectionsByGoogleID(googleID, function(reflections) {
    res.json(reflections);
  });
}