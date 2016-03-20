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


router.get('/addDummyComp', function(req, res){
 var comp = new Competition({
   name: "ICPC",
   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
   schoolID: "123testSchool",
   schoolName: "DPS Hwr.",
   regDate: {
     date: 12,
     month: 12,
     year: 1996
   },
   reqSkills: ["C++"]
 });

 comp.save(function(err){
   if(err) res.send(err);
   else res.send("Added Successfully");
 })
});

module.exports = router;
