var models = require('../models/model-manager');
var utils = require('./utils');
var url = require('url');
var path = require('path');

var isLoggedIn = function(req) { return req.user; }

/* GET route to return the logged-in user's previous reports */
module.exports.myReports = function(req, res) {
  var googleID = req.user.id;
  utils.getUserFromGoogleID(googleID,
    function(user) { // Successfully found user
      reportsFromIDs(user.reports, function(reports) {
        res.json(reports);
      });
    }, function() { // Could not find user
      res.error(500).send("ERR: Could not find user");
    }
  );  
}

/* GET route to retrieve a particular user's previous reports */
module.exports.reportsByGoogleID = function(req, res) {
  utils.getUserFromGoogleID(req.query.googleID,
    function(user) { // Successfully found user
      reportsFromIDs(user.reports, function(reports) {
        res.json(reports);
      });
    }, function() { // Could not find user
      res.error(500).send("ERR: Could not find user");
    }
  );
}

/* GET route to return what the logged-in user is reading right now */
module.exports.whatAmIReading = function(req, res) {
  var googleID = req.user.id;
  utils.getUserFromGoogleID(googleID,
    function(user) { // Successfully found user
      res.end(user.reading);
    }, function() { // Could not find user
      res.error(500).send("ERR: Could not find user");
    }
  );  
}

/* GET route to return what a particular user is reading right now */
module.exports.readingByGoogleID = function(req, res) {
  utils.getUserFromGoogleID(req.query.googleID,
    function(user) { // Successfully found user
      res.end(user.reading);
    }, function() { // Could not find user
      res.error(500).send("ERR: Could not find user");
    }
  );
}

/**
 * Recursively finds a list of Mongo Report documents,
 * given their Mongo IDs.
 * When finished, executes a callback function,
 * which takes as a parameter an array of reports,
 * in the same order as the supplied ids argument.
 * The parameter "reports" is optional and should not be included
 * when the function is originally called.
 */
var reportsFromIDs = function(ids, finishedCallback, reports) {
  if (!reports) { reports = []; } // reports is an optional param
  if (!ids.length) { // Base case: callback
    finishedCallback(reports);
  } else { // Recursive case: Find a report
    var id = ids[0]; // Pull the id from the beginning
    var remainingIds = ids.slice(1); // and shorten the ids list
    models.Report.findOne({_id: id}, function(err, report) {
      if (err) {
        console.log("ERR: Could not retrieve report from database");
      }
      reports.push(report); // Push the report to the end
      reportsFromIDs(remainingIds, finishedCallback, reports); // and recurse.
    })
  }
}