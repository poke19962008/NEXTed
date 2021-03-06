/**
** All the methods for Teacher and teacherDetail models
** Author: SAYAN DAS
**/


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
    'teacherID loggedIn', cb);
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

  /**
  ** Limited Search
  **/
  teacherSchema.methods.limitedSearch = function (cb){
    this.model('teacher').find({},
      'name schoolName', cb);
  };

  /**
  ** Update Login Time Stamp
  **/
  teacherSchema.methods.updateLoginTS = function(cb) {
    var timeStamp = Math.floor(Date.now() / 1000);
    this.model('teacher').update({
      'teacherID': this.teacherID,
    }, {
      'loggedIn': timeStamp
    }, cb);
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
    var model = this.model('teacherDetail');

    this.model('teacherDetail').findOne({
      'teacherID': endorseeID,
      'skills': {
        $elemMatch: {
          'skill': skill,
          'endorser': {
            $elemMatch: {
              'teacherID': endorser.teacherID
            }
          }
        }
      }
    }, function (err, doc){
      if(doc == null)
        model.update({
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
            },
            $inc: {
              'skills.$.counter': 1
            }
          }, cb);
        else
          model.update({
            'teacherID': endorseeID,
            'skills.skill': skill
          }, {
            $pull : {
              'skills.$.endorser': {
                teacherID: endorser.teacherID
              }
            },
            $inc: {
              'skills.$.counter': -1
            }
          }, cb);
    });
};


  /**
  ** Count Skills
  **/
  teacherDetailSchema.methods.countSkills = function(skill, cb){
    return this.model('teacherDetail').count({
      'teacherID': this.teacherID,
      'skills.skill': skill
    }, cb);
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


  // All the UPDATE methods

  /**
  **  Subject Update Module
  ** 1) addSubject() 2) removeSubject()
  **/
  teacherDetailSchema.methods.addSubject = function(subject, cb){
    var model = this.model('teacherDetail');
    var teacherID = this.teacherID;

    this.model('teacherDetail').count({
      'teacherID': teacherID,
      'subjects.subName': subject.subName,
      'subjects.subjectCode': subject.subjectCode
    }, function (err, count){
      if(count == 0)
        model.update({
            'teacherID': teacherID
          }, {
            $push: {
                'subjects' : subject
              }
        }, cb);
      else cb("already exist", "");
    });

  };

  teacherDetailSchema.methods.removeSubjects = function(subjects, cb){
    var model = this.model('teacherDetail');
    var teacherID = this.teacherID;

    model.find({
      'teacherID': teacherID,
      'subjects.subName': subject.subName,
      'subjects.subjectCode': subject.subjectCode
    }, function(err, count){
      if(count != 0)
        model.update({
            'teacherID': teacherID
          }, {
            $pull: {
                'subjects' : subjects
              }
        }, cb);
      else cb("does not exist", "");
    });

  };

  /**
  ** Update Email
  **/
  teacherDetailSchema.methods.updateEmail = function(cb){
    this.model('teacherDetail').update({
      'teacherID': this.teacherID
    }, {
      $set: {
        "personalInfo.email": this.personalInfo.email
      }
    }, cb);
  };

  /**
  ** Update Bio
  **/
  teacherDetailSchema.methods.updateBio = function(cb){
    this.model('teacherDetail').update({
      'teacherID': this.teacherID
    }, {
      $set: {
        'bio': this.bio
      }
    }, cb);
  };

  /**
  ** Update Designation
  **/
  teacherDetailSchema.methods.updateDesig = function(cb){
    this.model('teacherDetail').update({
      'teacherID': this.teacherID
    }, {
      $set: {
        'designation': this.designation
      }
    }, cb);
  };

  /**
  ** Update Qualification
  ** 1) addQualf 2) removeQualf
  **/
  teacherDetailSchema.methods.addQualf = function(qualf, cb){
    var model = this.model('teacherDetail');
    var teacherID = this.teacherID;

    model.count({
      'teacherID': this.teacherID,
      'qualification': {
        $elemMatch: {
          'degree': qualf.degree
        }
      }
    }, function(err, count){
      if(count == 0){
        model.update({
          'teacherID': teacherID,
        }, {
          $push: {
            'qualification': qualf
          }
        }, cb);
      }else cb("already exist", "");
    });
  };

  teacherDetailSchema.methods.removeQualf =  function(qualf, cb){
    var model = this.model('teacherDetail');
    var teacherID = this.teacherID;

    model.count({
      'teacherID': this.teacherID,
      'qualification': {
        $elemMatch: {
          'degree': qualf.degree
        }
      }
    }, function(err, count){
      if(count != 0){
        model.update({
          'teacherID': teacherID,
        }, {
          $pull: {
            'qualification': qualf
          }
        }, cb);
      }else cb("not found", "");
    });
  };

  /**
  ** Update Experience
  ** 1) addExp 2) removeExp
  **/
  teacherDetailSchema.methods.addExp = function(exp, cb){
    var model = this.model('teacherDetail');
    var teacherID = this.teacherID;

    model.count({
      'teacherID': this.teacherID,
      'experience': {
        $elemMatch: {
          'title': exp.title
        }
      }
    }, function(err, count){
      if(count == 0){
        model.update({
          'teacherID': teacherID,
        }, {
          $push: {
            'experience': exp
          }
        }, cb);
      }else cb("already exist", "");
    });
  };

  teacherDetailSchema.methods.removeExp =  function(exp, cb){
    var model = this.model('teacherDetail');
    var teacherID = this.teacherID;

    model.count({
      'teacherID': this.teacherID,
      'experience': {
        $elemMatch: {
          'title': exp.title
        }
      }
    }, function(err, count){
      if(count != 0){
        model.update({
          'teacherID': teacherID,
        }, {
          $pull: {
            'experience': exp
          }
        }, cb);
      }else cb("not found", "");
    });
  };

  /**
  ** Update Award
  ** 1) addAward 2) removeAward
  **/
  teacherDetailSchema.methods.addAward = function(award, cb){
    var model = this.model('teacherDetail');
    var teacherID = this.teacherID;

    model.count({
      'teacherID': this.teacherID,
      'award': {
        $elemMatch: {
          'title': award.title
        }
      }
    }, function(err, count){
      if(count == 0){
        model.update({
          'teacherID': teacherID,
        }, {
          $push: {
            'award': award
          }
        }, cb);
      }else cb("already exist", "");
    });
  };

  teacherDetailSchema.methods.removeAward =  function(award, cb){
    var model = this.model('teacherDetail');
    var teacherID = this.teacherID;

    model.count({
      'teacherID': this.teacherID,
      'award': {
        $elemMatch: {
          'title': award.title
        }
      }
    }, function(err, count){
      if(count != 0){
        model.update({
          'teacherID': teacherID,
        }, {
          $pull: {
            'award': award
          }
        }, cb);
      }else cb("not found", "");
    });
  };

  return teacherDetailSchema;
};
