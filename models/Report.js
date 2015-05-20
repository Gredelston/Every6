var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
  user: Number,
  title: String,
  author: String,
  text: String,
  submitted: Boolean
});

var Report = mongoose.model('Report', reportSchema);

module.exports.Report = Report;