exports.teacherMethod = function(teacherSchema) {

  /**
  ** Verify Teacher
  ** Matches for `teacherID` and `password`
  **/
  teacherSchema.methods.verifyTeacher = function(cb){
    return this.model('teacher').find({
      'teacherID': this.teacherID,
      'password': this.password
    },
    'teacherID', cb);
  };


  /**
  ** Get Details
  ** Returns `name`, `teacherID` and  `schoolID`
  ** from `teachers` collection
  **/
  teacherSchema.methods.getDetails = function (cb){
    return this.model('teacher').findOne({
      'teacherID': this.teacherID
    },
    'name teacherID schoolID', cb);
  };


  return teacherSchema;
};

exports.teacherDetailMethod = function (teacherDetailSchema) {

  /**
  ** Endorse
  ** TODO: Prevent Multiple from on User
  **/
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

  /**
  ** Get Skill
  **/
  teacherDetailSchema.methods.getSkills = function(cb){
    return this.model('teacherDetail').findOne({
      'teacherID': this.teacherID
    },
    'skills', cb);
  };

  /**
  ** Add Skill
  ** Adds skills to the user
  **/
  teacherDetailSchema.methods.addSkill = function(skillName, cb){
    return this.model('teacherDetail').update({
      'teacherID': this.teacherID
    },{
      $push: {
        'skills': {
          'skill': skillName,
          'endorser': []
        }
      }
    }, cb);
  };

  return teacherDetailSchema;
};
