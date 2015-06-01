var models = require('../models/model-manager');
var queries = require('../models/queries');
var url = require('url');
var path = require('path');

var isLoggedIn = function(req) { return req.user; }

/* GET route to return what the logged-in user is reading right now */
module.exports.whatAmIReading = function(req, res) {
  if (req.user) {
    var googleID = req.user.id;
    queries.readingByGoogleID(googleID, function(reading) {
      res.json(reading);
    });
  } else {
    res.json(null);
  }
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

module.exports.userByGoogleID = function(req, res) {
  var googleID = req.query.googleID;
  console.log("GoogleID: ", googleID);
  queries.userByGoogleID(googleID, function(user) {
    if (user!==null) {
      res.json(user);
    } else {
      res.end();
    }
  });
};

/* PUT request to update what a particular user is reading. */
module.exports.updateReading = function(req, res) {
  if (req.user) {
    var newTitle = req.body.newTitle;
    console.log("PUT REQUEST RECEIVED: " + newTitle);
    queries.updateReadingByGoogleID(req.user.id, newTitle, function() {
      res.end();
    })
  } else {
    res.end();
  }
}

module.exports.allReflections = function(req, res) {
  queries.allReflections(function(reflections) {
    res.json(reflections);
  })
}