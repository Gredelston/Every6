var reportSchema = mongoose.Schema({
  user: String,
  title: String,
  author: String,
  text: String,
  submitted: Boolean
});

var Report = mongoose.model('Twote', twoteSchema);

module.exports.Report = Report;