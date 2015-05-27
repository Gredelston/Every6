var CronJob = require('cron').CronJob;
var User = require('../models/model-manager').User;
var mailer = require('./mailer');

/**
 * CronJob syntax: "S M H D M W"
 * S: Second, 0-59
 * M: Minute, 0-59
 * H: Hour, 0-23
 * D: Day of month, 1-31
 * M: Month, 0-11
 * W: Day of week, 0-6
 * Ranges are also valid; e.g. day of week 1-5 refers to all Mon-Fri
 * Wildcard (*) refers to all possible values
 * Full documentation at https://github.com/ncb000gt/node-cron
 */

// Define Cron-formatted times to send emails
// Remove firstday1 after June 1, 
var firstday1    = "00 30 09  1  5    1" // Only at 9:30AM on June 1 -- remove this after!
var day1         = "00 30 09  1  5,11 *" // 9:30AM every June/Dec 1
var month2       = "00 30 09  1  6,0  *" // 9:30AM every July/Jan 1
var month4       = "00 30 09  1  8,2  *" // 9:30AM every September/March 1
var month6       = "00 30 09  1 10,4  *" // 9:30AM every November/May 1
var twoweeksleft = "00 30 09 15 10,4  *" // 9:30 every November/May 15

/* Find the current period. Borrowed from ../routes/index.js. */
var getCurrentPeriod = function() {
  var date = new Date();
  var period = (date.getYear() - 115) * 2;  // Two periods per year since 2015.
  if (5 <= date.getMonth() && date.getMonth() <= 10) { // If it's fall,
    period += 1; // then we are one period ahead.
  } else if (date.getMonth() == 11) { // If it's December
    period += 2; // then we are two periods ahead.
  }
  return period;
}

var submittedThisPeriod = function(user) {
  return user.lastSubmittedPeriod == getCurrentPeriod();
}

module.exports.run = function() {
  // On the very first day, send every user an email.
  new CronJob(firstday1, function() {
    console.log("Sending FirstDay1 emails!");
    User.find({}, function (err, users) {
      users.forEach(function(user) {
        mailer.firstday1(user.email);
      });
    });
  }).start();

  // Same for the first day of each cycle,
  // but also reset each user's "reading" field.
  new CronJob(day1, function() {
    console.log("Sending Day1 emails!");
    User.find({}, function (err, users) { // Find all users.
      users.forEach(function(user) { // For each user,
        mailer.day1(user.email); // Send the email.
        User.findOneAndUpdate( // Update the user.
          {googleID: user.googleID},
          {reading: null}
        );
      });
    });
  });//.start(); // DON'T START THIS ONE YET!!! Not until after 6/1/2015.

  // Send the 2nd month emails only to those who haven't picked books yet.
  // (And who haven't submitted yet.)
  new CronJob(month2, function() {
    console.log("Sending Month2 emails!");
    User.find({}, function (err, users) {
      users.forEach(function(user) {
        if (!user.reading && !submittedThisPeriod(user)) {
          mailer.month2(user.email);
        }
      });
    });
  }).start();

  // Send the 4th month emails only to those who haven't submitted yet.
  new CronJob(month4, function() {
    console.log("Sending Month4 emails!");
    User.find({}, function (err, users) {
      users.forEach(function(user) {
        if (!submittedThisPeriod(user)) {
          mailer.month4(user.email);
        }
      });
    });
  }).start();

  // Send the 6th month emails only to those who haven't submitted yet
  new CronJob(month6, function() {
    console.log("Sending Month6 emails!");
    User.find({}, function (err, users) {
      users.forEach(function(user) {
        if (!submittedThisPeriod(user)) {
          mailer.month6(user.email);
        }
      });
    });
  }).start();

  // Send the twoweeksleft emails only to those who haven't submitted yet.
  new CronJob(twoweeksleft, function() {
    console.log("Sending TwoWeeksLeft emails!");
    User.find({}, function (err, users) {
      users.forEach(function(user) {
        if (!submittedThisPeriod(user)) {
          mailer.twoweeksleft(user.email);
        }
      });
    });
  }).start();
}