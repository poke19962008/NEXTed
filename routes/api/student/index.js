var Student = require('./model').student;
var StudentDetail = require('./model').StudentDetail;

var express = require('express');
var router = expres.Router();

router.use(function (req, res, next){
  var type = req.session.IDType;

  if(!type != 'student' && type != undefined) res.send({ 'isValidUser': false });
  else next();
});

function isLoggedIn (req, res, next){
  var type = req.session.IDType;
  var ID = req.session.ID;

  if(type == undefined && ID == undefined) res.send({ 'sessionExpired': true });
  else next();
};


router.get('/', function(req, res){
  res.send('Welcome to Student API');
});
