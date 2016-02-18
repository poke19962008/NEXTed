exports.teacherMethod = function(teacherSchema) {

  teacherSchema.methods.verifyTeacher = function(cb){

    return this.model('teacher').find({
      'teacherID': this.teacherID,
      'password': this.password
    },
    'teacherID', cb);
  };


  return teacherSchema;
};

exports.teacherDetailMethod = function (teacherDetailSchema) {


  return teacherDetailSchema;
};
