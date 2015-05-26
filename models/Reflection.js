var mongoose = require('mongoose');

var reflectionSchema = mongoose.Schema({
  user: String,
  period: Number,
  title: String,
  author: String,
  text: String,
  isPrivate: Boolean,
  submitted: Boolean,
  submissionTime: Date
});

var Reflection = mongoose.model('Reflection', reflectionSchema);

module.exports = Reflection;