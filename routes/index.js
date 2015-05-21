var url = require('url');
var path = require('path');
var models = require('../models/model-manager');

// Navigation routes

/* Renders the homepage (/) */
module.exports.home = function(req, res) {
  res.render('home', {title: 'test'});
};

module.exports.thisPeriod = function(req, res) {
  res.render('thisPeriod');
}

module.exports.pastPeriods = function(req, res) {
  res.render('pastPeriods');
}

module.exports.about = function(req, res) {
  res.render('about');
}

module.exports.signup = function(req, res) {
  res.redirect('/');
}

module.exports.profileSettings = function(req, res) {
  res.redirect('/');
}

/**
 * Given a Date() object, return the Period # since the start.
 * The first period, June 15 - Nov 15, is Period 1.
 * Next, Dec 15 - May 16 is Period 2, continuing every 6 months.
 * Noteworthy for the code below: 2015 is 115 years since the epoch,
 * and months index from 0, so 5 is June, 10 is November, and 11 is December.
 */
var getPeriodFromDate = function(date) {
  var period = (date.getYear() - 115) * 2;  // Two periods per year since 2015.
  if (5 <= date.getMonth() && date.getMonth() <= 10) { // If it's fall,
    period += 1; // then we are one period ahead.
  } else if (date.getMonth() == 11) { // If it's December
    period += 2; // then we are two periods ahead.
  }
  return period;
}

/* Return the current period. */
var getCurrentPeriod = function() {
  return getPeriodFromDate(new Date());
}

var getUserFromGoogleID = function(id, successCallback, failCallback) {
  models.User.find({googleID: googleID}, function(err, user) {
    if (user) {
      successCallback(user);
    } else {
      failCallback();
    }
  });
};

var createCurrentUser = function() {
  if (!req.user) {
    console.log("ERROR: Attempted to create user when not logged in!");
    return null;
  }
  // Create the user
  var newUser = new User({
    googleID:    req.user.id,
    firstname:   req.user.name.givenName,
    lastname:    req.user.name.familyName,
    displayname: req.user.displayName,
    reports:     []
  });
  // Save + send
  newUser.save(function(err) {
    if (err) {
      console.log("ERROR: Could not save new user!");
      return null;
    } else {
      return newUser;
    }
  });
}

module.exports.getOrCreateCurrentUser = function(req, res) {
  if (!req.user) {
    // If client is not logged in, then return null.
    res.end(null);
  }
  getUserFromGoogleID(req.user.id,
    // Success callback function, for if a user already exists
    function(user) { res.json(user); },
    // Failure callback function, for if a user needs to be created
    function() {
      var newUser = createCurrentUser();
      if (newUser) {
        res.json(newUser);
      } else {
        res.error(500).send("ERROR: Could not create a new user!");
      }
    });
}

// Log in/out routes

/* GET request to return the logged-in Google ID, if logged in. */
module.exports.getGoogleUser = function(req, res) {
  if (req.user) {
    console.log("getGoogleUser: ", req.user.displayName);
    res.json(req.user);
  } else {
    res.end(null);
  }
}

/* If logged in, log out. Otherwise, log in. */
module.exports.logInOrOut = function(req, res) {
  if (req.user) {
    res.redirect('/logout');
  } else {
    res.redirect('/auth');
  }
}

/* Log out of Google OAuth. */
module.exports.logout = function(req, res) {
  console.log("Logging out");
  req.logout();
  res.redirect('/');
}

/* Render the .hbs file for a logged-in Google profile. */
module.exports.loggedInDisplay = function(req, res) {
  res.render('partials/loggedInDisplay', {
    imgURL: req.user._json.image.url,
    displayName: req.user.displayName,
    layout: false
  });
}

/* Callback for a successful Google authentication. */
module.exports.authSuccess = function(req, res) {
  console.log("SUCCESSFUL SUCCESS!!!!");
  res.redirect('/');
}

/* Callback for a failed Google authentication. */
module.exports.authFailure = function(req, res) {
  console.log("FAILURE TO FAIL!!!!!");
  res.redirect('/');
}