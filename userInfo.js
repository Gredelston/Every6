var models = require('../models/model-manager');
var url = require('url');
var path = require('path');

var isLoggedIn = function(req) { return req.user; }

/* GET route to return the logged-in user's previous reports */
module.exports.myReports = function(req, res) {
  var googleID = req.user.id;
  getUserFromGoogleID(googleID,
    function(user) { // Successfully found user
      res.end(user.reports);
    }, function() { // Could not find user
      res.error(500).send("ERR: Could not find user");
    }
  );  
}

/* GET route to retrieve a particular user's previous reports */
module.exports.reportsByGoogleID = function(req, res) {
  getUserFromGoogleID(req.query.googleID,
    function(user) { // Successfully found user
      res.end(user.reports);
    }, function() { // Could not find user
      res.error(500).send("ERR: Could not find user");
    }
  );
}

/* GET route to return what the logged-in user is reading right now */
module.exports.whatAmIReading = function(req, res) {
  var googleID = req.user.id;
  getUserFromGoogleID(googleID,
    function(user) { // Successfully found user
      console.log("FOUND A USER");
      console.log(user);
      res.end(user.reading);
    }, function() { // Could not find user
      res.error(500).send("ERR: Could not find user");
    }
  );  
}

/* GET route to return what a particular user is reading right now */
module.exports.readingByGoogleID = function(req, res) {
  getUserFromGoogleID(req.query.googleID,
    function(user) { // Successfully found user
      res.end(user.reading);
    }, function() { // Could not find user
      res.error(500).send("ERR: Could not find user");
    }
  );
}