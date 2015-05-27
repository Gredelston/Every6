var url = require('url');
var path = require('path');
var models = require('../models/model-manager');
var queries = require('../models/queries');

var isLoggedIn = function(req) { return req.user; }

// Navigation routes

/* Renders the homepage (/) */
module.exports.home = function(req, res) {
  res.render('home', {title: 'test'});
};

module.exports.you = function(req, res) {
  if (isLoggedIn(req)) {
    queries.reflectionsByGoogleID(req.user.id, function(refs) {
      queries.readingByGoogleID(req.user.id, function(reading) {
        res.render('you', {reflections: refs, reading: reading});
      });
    });
  } else {
    res.render('youLoggedOut');
  }
}

module.exports.user = function(req, res) {
  var googleID;
  if (req.user && req.params.id == req.user.id) {
    res.redirect("/you");
  } else if (req.params.id) {
    googleID = req.params.id;
    models.User.findOne({googleID: googleID}, function(err, user) {
      if (err) {
        res.error(500).send("Something went wrong in querying the database!");
      } else if (user) {
        queries.reflectionsByGoogleID(googleID, function(reflections) {
          res.render('userpage', {user: user, reflections: reflections});
        });
      } else {
        res.render('viewUserError')
      }
    });
  } else {
    res.error(500).send("No ID found!");
  }
}

module.exports.browse = function(req, res) {
  models.Reflection.find({}, function(err, reflections) {
    res.render('browse', {reflections: reflections});
  })
}

module.exports.about = function(req, res) {
  res.render('about');
}

module.exports.newReflection = function(req, res) {
  res.render('/');
}

module.exports.signupPage = function(req, res) {
  if (!req.user) {
    res.redirect('/');
  }
  console.log(req.user.name.givenName);
  res.render('signup', {
    firstName: req.user.name.givenName,
    email: req.user.emails[0].value});
}

module.exports.commit = function(req, res) {
  res.render('commit');
}

module.exports.newReflection = function(req, res) {
  res.render('newReflection');
}

module.exports.submitNewReflection = function(req, res) {
  if (!req.user) {
    res.error(500).send("Something went wrong! User not logged in");
  }
  // Create the reflection
  var newReflection = new models.Reflection({
    user:           req.user.id,
    period:         getCurrentPeriod(),
    title:          req.body.title,
    author:         req.body.author,
    text:           req.body.text,
    isPrivate:      req.body.isPrivate,
    submitted:      true,
    submissionTime: new Date()
  });
  // Save + send
  newReflection.save(function(err) {
    if (err) {
      res.error(500).send("Something went wrong! Could not save reflection");
    } else {
      // Also, update the user schema
      models.User.findOneAndUpdate({googleID: req.user.id},
        {
          $push: {reflections: newReflection._id},
          $set: {lastSubmittedPeriod: getCurrentPeriod()}
        }, function(user) { res.end("true"); }
      );
    }
  });
}

module.exports.signupSuccess = function(req, res) {
  res.render('signupSuccess');
}

module.exports.profileSettings = function(req, res) {
  res.redirect('/');
}

module.exports.viewReflection = function(req, res) {
  var reflectionID;
  if (req.params.id) {
    reflectionID = req.params.id;
    console.log("ID: ", reflectionID);
    models.Reflection.findOne({_id: reflectionID}, function(err, reflection) {
      if (err) {
        res.error(500).send("Something went wrong in querying the database!");
      } else if (reflection) {
        queries.userByGoogleID(reflection.user, function(user) {
          res.render('viewReflection', {reflection: reflection, user: user});
        });
      } else {
        res.render('viewReflectionError')
      }
    });
  } else {
    res.error(500).send("No ID found!");
  }
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

// Log in/out routes

/**
 * GET request to determine whether an email address is valid.
 * Returns "true" iff the email is valid; otherwise "false".
 * Stolen from http://stackoverflow.com/q/46155/
 */
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
    reading:     null,
    reflections:     []
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
  queries.userByGoogleID(req.user.id,
    function(user) {
      console.log("Auth success, found user");
      if (req.headers.referer) {
        console.log("REDIRECTING: " + req.headers.referer)
        res.redirect(req.headers.referer);
      } else {
        res.redirect("/");
      }
    }, function() {
      console.log("Auth success, found no user");
      res.redirect('/signup');
    }
  );
}

/* Callback for a failed Google authentication. */
module.exports.authFailure = function(req, res) {
  console.log("Failed to authenticate user via Google OAuth2.");
  res.redirect(req.headers.referer);
}