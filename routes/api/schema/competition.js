var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var competition = new Schema({
  name: String,
  schoolID: String,
  schoolName: String,
  regDate: {
    date: Number,
    month: Number,
    year: Number
  },
  reqSkills: [{
    skill: String
  }],
  participants: [{
    studentID: String,
    timestamp: Number
  }]
});

exports.competition = competition;
