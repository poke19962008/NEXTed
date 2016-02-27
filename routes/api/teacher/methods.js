exports.teacherMethod = function(teacherSchema) {

  teacherSchema.methods.verifyTeacher = function(cb){

    return this.model('teacher').find({
      'teacherID': this.teacherID,
      'password': this.password
    },
    'teacherID', cb);
  };

  teacherSchema.methods.getDetails = function (cb){

    return this.model('teacher').findOne({
      'teacherID': this.teacherID
    },
    'name teacherID schoolID', cb);
  };


  return teacherSchema;
};

exports.teacherDetailMethod = function (teacherDetailSchema) {
  teacherDetailSchema.methods.endorse = function(endorser, skill, cb){
    var timeStamp = Math.floor(Date.now() / 1000);
    var endorseeID = this.teacherID;

    this.model('teacherDetail').update({
        'teacherID': endorseeID,
        'skills.skill': skill
      },{
        $push: {
          'skills.$.endorser': {
            name: endorser.name,
            timeStamp: timeStamp,
            teacherID: endorser.teacherID,
            schoolID: "schoolID"
          }
        }
      }, cb);

  };

  return teacherDetailSchema;
};
