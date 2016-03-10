/**
** All the methods for Student and StudentDetail models
** Author: SAYAN DAS
**/


exports.studentMethod = function(studentSchema) {

  /**
  ** Verify Teacher
  ** Matches for `teacherID` and `password`
  **/
  studentSchema.methods.verifyStudent = function(cb){
    return this.model('teacher').find({
      'studentID': this.teacherID,
      'password': this.password
    },
    'studentID', cb);
  };

  /**
  ** Get Details
  ** Returns `name`, `teacherID` and  `schoolID`
  ** from `teachers` collection
  **/
  studentSchema.methods.getDetails = function (cb){
    return this.model('student').findOne({
      'studentID': this.studentID
    },
    'name studentID schoolID', cb);
  };

  /**
  ** Limited Search
  **/
  studentSchema.methods.limitedSearch = function (cb){
    this.model('student').find({},
      'name schoolName', cb);
  };

  return studentSchema;
};

exports.studentDetailMethod = function(studentDetailSchema) {

  return studentDetailSchema;
};
