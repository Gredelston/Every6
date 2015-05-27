var CronJob = require('cron').CronJob;

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

module.exports.run = function() {
  //new CronJob('0,5,10,15,20,25,30,35,40,45,50,55 *       17 27 000004 *', function() {console.log(new Date());} ).start();
}