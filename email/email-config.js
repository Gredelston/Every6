var nodemailer = require('nodemailer');
var authUser   = "every6months@gmail.com";
var authPass   = process.env.EVERY6_GMAIL_PW;

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: authUser,
    pass: authPass
  }
});

var mailOptions = {
  from: "Fred Foo ✔ <foo@blurdybloop.com>",
  to: 'gredelston@gmail.com, greg@foobo.io', // list of receivers 
  subject: 'Test1 ✔', // Subject line 
  text: 'Stalling 2 ✔', // plaintext body 
  html: '<b>Purl 3 ✔</b>' // html body 
};

transporter.sendMail(mailOptions, function(err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log("Message sent: " + info.response);
  }
});