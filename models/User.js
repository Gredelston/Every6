var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	googleID: String,
  firstname: String,
  lastname: String,
  displayname: String,
  reading: String,
  email: String,
  reports: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;