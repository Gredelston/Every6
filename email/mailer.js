var send = require ('./email-config');

module.exports.welcome = function(to) {
  send(to, "Welcome to Every6!", path.join(__dirname, "welcome.html"));
}

module.exports.firstday1 = function(to) {
  send(to, "Let's get started!", path.join(__dirname,"firstday1.html"));
}

module.exports.day1 = function(to) {
  send(to, "A new term, a new book!", path.join(__dirname,"day1.html"));
}

module.exports.month2 = function(to) {
  send(to, "A month already?", path.join(__dirname,"month2.html"));
}

module.exports.month4 = function(to) {
  send(to, "Halfway through", path.join(__dirname,"month4.html"));
}

module.exports.month6 = function(to) {
  send(to, "Time is running out", path.join(__dirname,"month6.html"));
}

module.exports.twoweeksleft = function(to) {
  send(to, "The final push", path.join(__dirname,"twoweeksleft.html"));
}

module.exports.congrats = function(to) {
  send(to, "We got what you wrote!", path.join(__dirname,"congrats.html"));
}

module.exports.firstday1("greg@students.olin.edu");
module.exports.welcome("greg@students.olin.edu");
module.exports.day1("greg@students.olin.edu");
module.exports.month2("greg@students.olin.edu");
module.exports.month4("greg@students.olin.edu");
module.exports.month6("greg@students.olin.edu");
module.exports.twoweeksleft("greg@students.olin.edu");
module.exports.congrats("greg@students.olin.edu");
