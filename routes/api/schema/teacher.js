var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var teacher = new Schema({
  schoolID: String,
  teacherID: String,
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
      date: {
        date: Number,
        month: Number,
        year: Number,
      },
      description: String
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
