var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
  user: Number,
  period: Number,
  title: String,
  author: String,
  text: String,
  submitted: Boolean,
  submissionTime: Date
});

var Report = mongoose.model('Report', reportSchema);

module.exports.Report = Report;