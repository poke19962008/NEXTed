/**
** Competition API: index.js
** Author: SAYAN DAS
**/

//Child Routers

// Competition Model
var Competition = require("./model").competition;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.send("hello");
});

// Add Dummy Competition
router.get('/addDummyComp', function(req, res){
 var comp = new Competition({
   name: "Behes",
   description: "Dummy",
   schoolID: "123testSchool",
   schoolName: "DPS Noida.",
   venue: "Apple Lab",
   regDate: {
     date: 12,
     month: 11,
     year: 2012
   },
   reqSkills: ["Debate"]
 });

 comp.save(function(err){
   if(err) res.send(err);
   else res.send("Added Successfully");
 })
});

module.exports = router;
