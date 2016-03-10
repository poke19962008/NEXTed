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

  return studentSchema;
};

exports.studentDetailMethod = function(studentDetailSchema) {

  return studentDetailSchema;
};
