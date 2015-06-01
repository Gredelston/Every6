var models = require('../models/model-manager');

/**
 * Searches for a Mongo User document by a Google ID,
 * and fires a callback function depending on whether a user was found.
 * Success callback takes one argument (the User document);
 * failure callback (optional) takes no arguments.
 */
module.exports.userByGoogleID = function(googleID, successCallback, failCallback) {
  models.User.findOne({googleID: googleID}, function(err, user) {
    if (user!==null) {
      successCallback(user);
    } else {
      if (failCallback) {
        failCallback();
      }
    }
  });
};

/* Find all users, and call back, passing in the array of user objs. */
module.exports.allUsers = function(callback) {
  models.User.find({}, function(err, users) {
    callback(users);
  });
}

/* Find what a particular user is reading right now, and call back. */
module.exports.readingByGoogleID = function(googleID, callback) {
  module.exports.userByGoogleID(googleID,
    function(user) { // Successfully found user
      callback(user.reading);
    }, function() { // Could not find user
      callback("");
    }
  );
}

/**
 * Retrieve a particular user's previous reflections, and call back.
 * Sort the reflections descendingly in order of time written,
 * so that the most recent reflection is at the front of the list.
 */
module.exports.reflectionsByGoogleID = function(googleID, callback) {
  module.exports.userByGoogleID(googleID,
    function(user) { // Successfully found user
      reflectionsFromIDs(user.reflections, function(reflections) {
        reflections.sort(function(a, b) { return (a._id < b._id) });
        callback(reflections);
      });
    }, function() { // If could not find user,
      callback([]); // then frown.
    }
  );
}

/* Update a particular user's current "reading". */
module.exports.updateReadingByGoogleID = function (gID, newReading, callback) {
  var query = {googleID: gID};
  var update = {reading: newReading};
  models.User.findOneAndUpdate(query, update, callback);
}

/**
 * Recursively finds a list of Mongo Reflection documents,
 * given their Mongo IDs.
 * When finished, executes a callback function,
 * which takes as a parameter an array of reflections,
 * in the same order as the supplied ids argument.
 * The parameter "reflections" is optional and should not be included
 * when the function is originally called.
 */
var reflectionsFromIDs = function(ids, finishedCallback, reflections) {
  if (!reflections) { reflections = []; } // reflections is an optional param
  if (!ids.length) { // Base case: callback
    finishedCallback(reflections);
  } else { // Recursive case: Find a reflection
    var id = ids[0]; // Pull the id from the beginning
    var remainingIds = ids.slice(1); // and shorten the ids list
    models.Reflection.findOne({_id: id}, function(err, reflection) {
      if (err) {
        console.log("ERR: Could not retrieve reflection from database");
      }
      reflections.push(reflection); // Push the reflection to the end
      reflectionsFromIDs(remainingIds, finishedCallback, reflections);
    })
  }
}