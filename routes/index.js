var url = require('url');
var path = require('path');
var models = require('../models/model-manager');

// Navigation routes

/* Renders the homepage (/) */
module.exports.home = function(req, res) {
  res.render('home', {title: 'test'});
};

module.exports.you = function(req, res) {
  res.render('you');
}

module.exports.browse = function(req, res) {
  res.render('browse');
}

module.exports.about = function(req, res) {
  res.render('about');
}

module.exports.signupPage = function(req, res) {
  if (!req.user) {
    res.redirect('/');
  }
  console.log(req.user.name.givenName);
  res.render('signup', {
    firstName: req.user.name.givenName,
    email: "gredelston@gmail.com"});
}

module.exports.signupSuccess = function(req, res) {
  res.render('signupSuccess');
}

module.exports.profileSettings = function(req, res) {
  res.redirect('/');
}

// Utility functions

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

var getCurrentPeriod = function() {
  return getPeriodFromDate(new Date());
}

var getUserFromGoogleID = function(googleID, successCallback, failCallback) {
  models.User.findOne({googleID: googleID}, function(err, user) {
    if (user!==null) {
      successCallback(user);
    } else {
      failCallback();
    }
  });
};

// Log in/out routes

/* Stolen from http://stackoverflow.com/q/46155/ */
module.exports.validateEmail = function(req, res) {
  var email = req.query.email;
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  res.end(String(re.test(email)));
}

/**
 * POST request called to create a new user account.
 * Return "true" iff the user was successfully signed up,
 */
module.exports.createUser = function(req, res) {
  if (!req.user) {
    res.error(500).send("Something went wrong! User not logged in");
  }
  // Create the user
  var newUser = new models.User({
    googleID:    req.user.id,
    firstname:   req.user.name.givenName,
    lastname:    req.user.name.familyName,
    displayname: req.user.displayName,
    email:       req.body.email,
    reports:     []
  });
  // Save + send
  newUser.save(function(err) {
    if (err) {
      res.error(500).send("Something went wrong! Could not save user");
    } else {
      res.end("true");
    }
  });
}

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
  getUserFromGoogleID(req.user.id,
    function(user) {
      console.log("Auth success, found user");
      res.redirect('/');
    }, function() {
      console.log("Auth success, found no user");
      res.redirect('/signup');
    }
  );
}

/* Callback for a failed Google authentication. */
module.exports.authFailure = function(req, res) {
  console.log("Failed to authenticate user via Google OAuth2.");
  res.redirect('/');
}