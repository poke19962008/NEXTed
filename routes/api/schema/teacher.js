var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var teacher = new Schema({
  schoolID: String,
  teacherID: String,
  schoolName: String,
  bio: String,
  name: {
      fName: String,
      mName: String,
      lName: String
  },
  classes: [{
      class_: String
  }],
  password: String,
  loggedIn: {
    type: Number,
    default: -1
  }
});

var teacherDetail = new Schema({
    teacherID: String,
    schoolID: String,
    designation: String,
    subjects: [{
        subjectCode: String,
        subName: String
    }],
    email: String,
    qualification: [{
        degree: String,
        course: String,
        institute: String
    }],
    experience: [{
      title: String,
      description: String,
      date: {
        date: Number,
        month: Number,
        year: Number,
      }
    }],
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

exports.teacher = teacher;
exports.teacherDetail = teacherDetail;
