var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var student = new Schema({
  schoolID: String,
  studentID: String,
  schoolName: String,
  name: {
      fName: String,
      mName: String,
      lName: String
  },
  classes: [{
      class_: String
  }],
  password: String
});

var studentDetail = new Schema({
    studentID: String,
    schoolID: String,
    designation: String,
    subjects: [{
        subjectCode: String,
        subName: String
    }],
    email: String,
    skills: [{
        skill: String,
        counter: 0,
        endorser: [{
            name: {
                fName: String,
                mName: String,
                lName: String
            },
            timeStamp: Number,
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
});

exports.student = student;
exports.studentDetail = studentDetail;
