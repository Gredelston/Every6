var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	googleID: Number,
  firstname: String,
  lastname: String,
  reports: [Number]
});

var User = mongoose.model('User', userSchema);

module.exports = User;