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