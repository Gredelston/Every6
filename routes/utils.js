var models = require('../models/model-manager');

/**
 * Searches for a Mongo User document by a Google ID,
 * and fires a callback function depending on whether a user was found.
 * Success callback takes one argument (the User document);
 * failure callback takes no arguments.
 */
module.exports.getUserFromGoogleID = function(googleID, successCallback, failCallback) {
  models.User.findOne({googleID: googleID}, function(err, user) {
    if (user!==null) {
      successCallback(user);
    } else {
      failCallback();
    }
  });
};

/* GET route to return what a particular user is reading right now */
module.exports.readingByGoogleID = function(googleID, callback) {
  module.exports.getUserFromGoogleID(googleID,
    function(user) { // Successfully found user
      callback(user.reading);
    }, function() { // Could not find user
      callback("");
    }
  );
}

/* Retrieve a particular user's previous reports, and call back. */
module.exports.reportsByGoogleID = function(googleID, callback) {
  module.exports.getUserFromGoogleID(googleID,
    function(user) { // Successfully found user
      reportsFromIDs(user.reports, function(reports) {
        callback(reports);
      });
    }, function() { // If could not find user,
      callback([]); // then frown.
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