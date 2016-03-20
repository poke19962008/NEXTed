var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var competition = new Schema({
  name: String,
  description: String,
  schoolID: String,
  schoolName: String,
  venue: String,
  regDate: {
    date: Number,
    month: Number,
    year: Number
  },
  reqSkills: [String],
  participants: [{
    studentID: String,
    timestamp: Number
  }]
});

exports.competition = competition;
