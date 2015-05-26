var nodemailer = require('nodemailer');
var htmltotext = require('html-to-text');
var fs         = require('fs');

var authUser   = "every6months@gmail.com";
var authPass   = process.env.EVERY6_GMAIL_PW;
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: authUser,
    pass: authPass
  }
});

var send = function(to, subject, htmlFile) {
  // Open the HTML file containing the email
  fs.readFile(htmlFile, {encoding: 'ascii'}, function(readErr, html) {
    if (readErr) {
      console.log("ERR: ", readErr);
    } else {
      console.log("HTML: ", html);
      // Set up the email info -- to, from, subject, text
      var mailOptions = {
        from: "Every 6 Months <every6months@gmail.com>",
        to: to,
        subject: subject,
        text: htmltotext.fromString(html),
        html: html
      }

      // Scan it, send it, fax-rename it.
      transporter.sendMail(mailOptions, function(sendErr, info) {
        if (sendErr) {
          console.log("Error sending message: " + sendErr);
          console.log("ERRORISNULL: ", sendErr===null);
        } else {
          console.log("Message sent to " + to + ": " + info.response);
        }
      });
    }
  })
}

module.exports = send;