var mongoose = require('mongoose');

// Connecting to MongoDB
var mongoURI = process.env.MONGOURI || "mongodb://every6-admin:pmills@ds031972.mongolab.com:31972/every6";
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Successfully opened mongo database: ', mongoURI);
});

module.exports.Reflection = require('./Reflection.js');
module.exports.User = require('./User.js')