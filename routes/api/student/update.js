/**
** Update Router: update.js
** Author: SAYAN DAS
** NOTE: All the request are POST requests
** and Header: application/json
**/


var express = require('express');
var router = express.Router();

// All the Student models
var Student = require('./model').student;
var StudentDetail = require('./model').studentDetail;

// Checks if person is logged in.
var isLoggedIn = function isLogedIn (req, res, next){
  var type = req.session.IDType;
  var ID = req.session.ID;

  if(type == undefined && ID == undefined) res.send({ 'sessionExpired': true });
  else next();
};

router.get('/', isLoggedIn, function(req, res){
  res.send('Welcome to Student Update Module');
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
  var studentID  = req.session.ID;
  var body = req.body;
  var verified = true;

  // Body Verification
  if(body.email == undefined) verified = false;

  // Update Process
  var studentDetail = new StudentDetail({
    'studentID': studentID,
    'email': body.email
  });

  if(verified)
    studentDetail.updateEmail(function(err, doc){
      if(err) res.send({ status: 'ise' });
      else res.send({ status: 'success' });
    });
  else res.send({ status: 'inv. format' });
});


/**
** UPDATE COMPETITION (POST)
** PARAMETERS -> 1) add 2) remove
** BODY(application/json) ->{competition: [
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
** Comp Already Exist -> { status: already exist }
** Comp Not Found -> { status: not found }
**/
router.post('/:id/competition', isLoggedIn, function (req, res){
  var opr = req.params.id;
  var data = req.body;
  var studentID = req.session.ID;
  var verified = true;

  // Body Verification
  if(data.competition == undefined) verified = false;
  else {
    if(data.competition.length == 0) verified = false;
    else for (var i = 0; i < data.competition.length; i++) {
      if(data.competition[i].date != undefined){
        if(data.competition[i].title == undefined ||
           data.competition[i].description == undefined ||
           data.competition[i].date.date == undefined ||
           data.competition[i].date.month == undefined ||
           data.competition[i].date.year == undefined)
          {verified = false; break;}
      } else {verified = false; break;}
    }
  }

  // Update Process
  try {
    var studentDetail = new StudentDetail({
      'studentID': studentID
    });
    var exps = data.competition;
    console.log(data);

    if(opr == "add")
      for(var i=0; i < exps.length; i++)
        studentDetail.addExp( exps[i], function(err, doc){
          if(err == "already exist") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
    else if(opr == "remove")
      for(var i=0; i < exps.length; i++)
        studentDetail.removeExp( exps[i], function(err, doc){
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
  var studentID = req.session.ID;
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
  var studentDetail = new StudentDetail({
    'studentID': studentID
  });
  var awards = data.award;

  try {
    if(opr == "add")
      for(var i=0; i < awards.length; i++)
        studentDetail.addAward( awards[i], function(err, doc){
          if(err == "already exist") res.send({ status: err });
          else if(err) res.send({ status: 'ise' });
          else res.send({ status: 'success' });
        });
    else if(opr == "remove")
      for(var i=0; i < awards.length; i++)
        studentDetail.removeAward( awards[i], function(err, doc){
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
