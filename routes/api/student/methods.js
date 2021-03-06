/**
** All the methods for Student and StudentDetail models
** Author: SAYAN DAS
**/

// External Models
var Competition = require('../competition/model').competition;

exports.studentMethod = function(studentSchema) {

  /**
  ** Verify Student
  ** Matches for `studentID` and `password`
  **/
  studentSchema.methods.verifyStudent = function(cb){

    this.model('student').find({
      'studentID': this.studentID,
      'password': this.password
    },
    'studentID loggedIn', cb);
  };

  /**
  ** Get Details
  ** Returns `name`, `studentID` and  `schoolID`
  ** from `students` collection
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

  /**
  ** Update Loggin Time Stamp
  **/
  studentSchema.methods.updateLoginTS = function (cb){
    var timeStamp = Math.floor(Date.now() / 1000);
    this.model('student').update({
      'studentID': this.studentID
    }, {
      'loggedIn': timeStamp
    }, cb);
  };

  return studentSchema;
};

exports.studentDetailMethod = function(studentDetailSchema) {
  /**
  ** Count Skills
  **/
  studentDetailSchema.methods.countSkills = function(skill, cb){
    return this.model('studentDetail').count({
      'studentID': this.studentID,
      'skills.skill': skill
    }, cb);
  };

  /**
  ** Add Skill
  ** Adds skills to the user
  **/
  studentDetailSchema.methods.addSkill = function(skillName, cb){
    return this.model('studentDetail').update({
      'studentID': this.studentID
    },{
      $push: {
        'skills': {
          'skill': skillName,
          'counter': 0,
          'endorser': []
        }
      }
    }, cb);
  };

  /**
  ** Update Email
  **/
  studentDetailSchema.methods.updateEmail = function(cb){
    this.model('studentDetail').update({
      'studentID': this.studentID
    }, {
      $set: {
        'personalInfo.email': this.personalInfo.email
      }
    }, cb);
  };

  /**
  ** Update Bio
  **/
  studentDetailSchema.methods.updateBio = function(cb){
    this.model('studentDetail').update({
      'studentID': this.studentID
    }, {
      $set: {
        'bio': this.bio
      }
    }, cb);
  };

  /**
  ** Update Experience
  ** 1) addExp 2) removeExp
  **/
  studentDetailSchema.methods.addExp = function(exp, cb){
    var model = this.model('studentDetail');
    var studentID = this.studentID;

    model.count({
      'studentID': this.studentID,
      'competition': {
        $elemMatch: {
          'title': exp.title
        }
      }
    }, function(err, count){
      if(count == 0){
        model.update({
          'studentID': studentID,
        }, {
          $push: {
            'competition': exp
          }
        }, cb);
      }else cb("already exist", "");
    });
  };

  studentDetailSchema.methods.removeExp =  function(exp, cb){
    var model = this.model('studentDetail');
    var studentID = this.studentID;

    model.count({
      'studentID': this.studentID,
      'competition': {
        $elemMatch: {
          'title': exp.title
        }
      }
    }, function(err, count){
      if(count != 0){
        model.update({
          'studentID': studentID,
        }, {
          $pull: {
            'competition': exp
          }
        }, cb);
      }else cb("not found", "");
    });
  };

  /**
  ** Update Award
  ** 1) addAward 2) removeAward
  **/
  studentDetailSchema.methods.addAward = function(award, cb){
    var model = this.model('studentDetail');
    var studentID = this.studentID;

    model.count({
      'studentID': this.studentID,
      'award': {
        $elemMatch: {
          'title': award.title
        }
      }
    }, function(err, count){
      if(count == 0){
        model.update({
          'studentID': studentID,
        }, {
          $push: {
            'award': award
          }
        }, cb);
      }else cb("already exist", "");
    });
  };

  studentDetailSchema.methods.removeAward =  function(award, cb){
    var model = this.model('studentDetail');
    var studentID = this.studentID;

    model.count({
      'studentID': this.studentID,
      'award': {
        $elemMatch: {
          'title': award.title
        }
      }
    }, function(err, count){
      if(count != 0){
        model.update({
          'studentID': studentID,
        }, {
          $pull: {
            'award': award
          }
        }, cb);
      }else cb("not found", "");
    });
  };

  /**
  ** Get All Related Competition
  **/
  studentDetailSchema.methods.getRelatedComp = function(cb){
    var comp = new Competition();

    this.model('studentDetail').findOne({
      studentID: this.studentID,
    }, "skills.skill", function(err, doc){
      if(err) cb(err, "");
      else {
        doc = doc.skills;
        for (var i = 0; i < doc.length; i++) doc[i] = doc[i].skill;
        comp.getCompetition(doc, cb);
      }
    });
  };

  return studentDetailSchema;
};
