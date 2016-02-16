var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var teacher = new Schema({
  teacherID: String,
  name: {
      fName: String,
      mName: String,
      lName: String
  },
  classes: [{
      class_: String 
  }]
});

var teacherDetail = new Schema({
    teacherID: String,
    designation: String,
    subject: [{
        subjectCode: String,
        subName: String
    }],
    email: String,
    qualification: {
        degree: String,
        course: String,
        institute: String
    },
    skill: [{
        skill: String,
        endorser: [{
            name: String,
            timeStamp: String,
            teacherID: String,
            schoolID: String,
        }]
    }],
    award: [{
        title: String,
        description: String,
        date: {
            date: Number,
            month: Number,
            year: Number
        }
    }],
    password: String
});

exports.teacher = teacher;
exports.teacherDetail = teacherDetail;