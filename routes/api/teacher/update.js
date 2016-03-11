/**
** Update Router: update.js
** Author: SAYAN DAS
** NOTE: All the request are POST requests
** and Header: application/json
**/


var router = require('express').Router();

// All the Teacher models
var Teacher = require('./model').teacher;
var TeacherDetail = require('./model').teacherDetail;

// Checks if person is logged in.
var isLoggedIn = function isLogedIn (req, res, next){
  var type = req.session.IDType;
  var ID = req.session.ID;

  if(type == undefined && ID == undefined) res.send({ 'sessionExpired': true });
  else next();
};

router.get('/', isLoggedIn, function(req, res){
  res.send('Welcome to Teacher Update Module');
});


/**
** SUBJECT UPDATE (POST)
** PARAMETERS -> add, remove
** BODY(application/json) -> {
    subjects: [{
      subjectCode: String,
      subName: String
    }]
  }
** RESPONSE
** Success -> { status: success }
** Internal Server Error -> { status: ise }
** Invalid Routing -> { status: inv. routing }
** Subject Already Exist -> { status: already exist }
** Subject Not Found -> { status: not found }
**/
router.post('/:id/subjects', isLoggedIn, function (req, res){
  var opr = req.params.id;
  var teacherID  = req.session.ID;
  var data = req.body;
  var verified = false;

  // Body Verification
  if(data.subjects != undefined){
    verified = true;
    for (var i = 0; i < data.subjects.length; i++) {
      var subject = data.subjects[i];

      if(subject.subjectCode == undefined ||
         subject.subName == undefined){
           verified = false;
           break;
         }
    }
  }

  // Update Process
  var teacherDetail = new TeacherDetail({
    'teacherID': teacherID
  });
  var subjects = data['subjects'];

  if(verified){
    if(opr == "add")
      for (var i = 0; i < subjects.length; i++) {
        teacherDetail.addSubject(subjects[i], function (err, doc){
          if(err == "already exist") res.send({ status: err});
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
      }
    else if(opr == "remove")
      for (var i = 0; i < subjects.length; i++) {
        console.log(subjects[i]);
        teacherDetail.removeSubjects(subjects[i], function (err, doc){
          if(err == "not found") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
      }
    else res.send({ status: 'inv. routing' });
  }

});


/**
** UPDATE EMAIL (POST)
** TODO: Regex Verification of Email
** BODY(application/json) ->
** { email: String }
** RESPONSE
** Success -> { status: success }
** Internal Server Error -> { status: ise }
** Inv Body Format -> { status: 'inv. format' }
**/
router.post('/email', isLoggedIn, function (req, res){
  var teacherID  = req.session.ID;
  var body = req.body;
  var verified = true;

  // Body Verification
  if(body.email == undefined) verified = false;

  // Update Process
  var teacherDetail = new TeacherDetail({
    'teacherID': teacherID,
    'email': body.email
  });

  try {
    teacherDetail.updateEmail(function(err, doc){
      if(err) res.send({ status: 'ise' });
      else res.send({ status: 'success' });
    });
  } catch(e){
    if(!verified){
      res.send({ status: 'inv. format' });
      res.end();
    }
  }

});


/**
** UPDATE QUALIFICATION (POST)
** PARAMETERS -> 1) add 2) remove
** BODY(application/json) ->{qualification: [
  degree: String,
  course: String,
  institute: String
]}
** RESPONSE
** Success -> { status: success }
** Internal Server Error -> { status: ise }
** Invalid Body Format -> { status: inv. format }
** Invalid Routing -> { status: inv. routing }
** Qualf Already Exist -> { status: already exist }
** Qualf Not Found -> { status: not found }
**/
router.post('/:id/qualification', isLoggedIn, function (req, res){
  var opr = req.params.id;
  var data = req.body;
  var teacherID = req.session.ID;
  var verified = true;

  // Body Verification
  if(data.qualification == undefined) verified = false;
  else {
    if(data.qualification.length == 0) verified = false;
    else for (var i = 0; i < data.qualification.length; i++) {
      if(data.qualification[i].degree == undefined ||
         data.qualification[i].course == undefined ||
         data.qualification[i].institute == undefined)
        verified = false;
    }
  }

  // Update Process
  var teacherDetail = new TeacherDetail({
    'teacherID': teacherID
  });
  var qualfs = data.qualification;

  try {
    if(opr == "add")
      for(var i=0; i<qualfs.length; i++)
        teacherDetail.addQualf(qualfs[i], function(err, doc){
          if(err == "already exist") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
    else if(opr == "remove")
      for(var i=0; i<qualfs.length; i++)
        teacherDetail.removeQualf(qualfs[i], function(err, doc){
          if(err == "not found") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
    else res.send({ status: 'inv. routing' });
  } catch(e){
    if(!verified){
      res.send({ status: 'inv. format' });
      res.end();
    }
  }

});


/**
** UPDATE EXPERIENCE (POST)
** PARAMETERS -> 1) add 2) remove
** BODY(application/json) ->{experience: [
  title: String,
  description: String,
  date: {
    date: Number,
    month: Number,
    year: Number
  }
]}
** RESPONSE
** Success -> { status: success }
** Internal Server Error -> { status: ise }
** Invalid Body Format -> { status: inv. format }
** Invalid Routing -> { status: inv. routing }
** Qualf Already Exist -> { status: already exist }
** Qualf Not Found -> { status: not found }
**/
router.post('/:id/experience', isLoggedIn, function (req, res){
  var opr = req.params.id;
  var data = req.body;
  var teacherID = req.session.ID;
  var verified = true;

  // Body Verification
  if(data.experience == undefined) verified = false;
  else {
    if(data.experience.length == 0) verified = false;
    else for (var i = 0; i < data.experience.length; i++) {
      if(data.experience[i].date != undefined){
        if(data.experience[i].title == undefined ||
           data.experience[i].description == undefined ||
           data.experience[i].date.date == undefined ||
           data.experience[i].date.month == undefined ||
           data.experience[i].date.year == undefined)
          {verified = false; break;}
      } else {verified = false; break;}
    }
  }

  // Update Process
  var teacherDetail = new TeacherDetail({
    'teacherID': teacherID
  });
  var exps = data.experience;

  try {
    if(opr == "add")
      for(var i=0; i < exps.length; i++)
        teacherDetail.addExp( exps[i], function(err, doc){
          if(err == "already exist") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
    else if(opr == "remove")
      for(var i=0; i < exps.length; i++)
        teacherDetail.removeExp( exps[i], function(err, doc){
          if(err == "not found") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
    else res.send({ status: 'inv. routing' });
  } catch(e){
    if(!verified){
      res.send({ status: 'inv. format' });
      res.end();
    }
  }
});

/**
** UPDATE AWARDS (POST)
** PARAMETERS -> 1) add 2) remove
** BODY(application/json) ->{experience: [
  title: String,
  description: String,
  date: {
    date: Number,
    month: Number,
    year: Number
  }
]}
** RESPONSE
** Success -> { status: success }
** Internal Server Error -> { status: ise }
** Invalid Body Format -> { status: inv. format }
** Invalid Routing -> { status: inv. routing }
** Award Already Exist -> { status: already exist }
** Award Not Found -> { status: not found }
**/
router.post('/:id/award', isLoggedIn, function (req, res){
  var opr = req.params.id;
  var data = req.body;
  var teacherID = req.session.ID;
  var verified = true;

  // Body Verification
  if(data.award == undefined) verified = false;
  else {
    if(data.award.length == 0) verified = false;
    else for (var i = 0; i < data.award.length; i++) {
      if(data.award[i].date != undefined){
        if(data.award[i].title == undefined ||
           data.award[i].description == undefined ||
           data.award[i].date.date == undefined ||
           data.award[i].date.month == undefined ||
           data.award[i].date.year == undefined)
          {verified = false; break;}
      } else {verified = false; break;}
    }
  }

  // Update Process
  var teacherDetail = new TeacherDetail({
    'teacherID': teacherID
  });
  var awards = data.award;

  try {
    if(opr == "add")
      for(var i=0; i < awards.length; i++)
        teacherDetail.addAward( awards[i], function(err, doc){
          if(err == "already exist") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
    else if(opr == "remove")
      for(var i=0; i < awards.length; i++)
        teacherDetail.removeAward( awards[i], function(err, doc){
          if(err == "not found") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
    else res.send({ status: 'inv. routing' });
  } catch(e){
    if(!verified){
      res.send({ status: 'inv. format' });
      res.end();
    }
  }
});

module.exports = router;
