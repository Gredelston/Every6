var nodemailer = require('nodemailer');
var htmltotext = require('html-to-text');
var authUser   = "every6months@gmail.com";
var authPass   = process.env.EVERY6_GMAIL_PW;

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: authUser,
    pass: authPass
  }
});

var send = function(to, subject, html) {
  var mailOptions = {
    from: "Every 6 Months <every6months@gmail.com>",
    to: to,
    subject: subject,
    text: htmltotext.fromString(html),
    html: html
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(err);
    } else {
      console.log("Message sent to " + to + ": " + info.response);
    }
  });
}

module.exports = send;