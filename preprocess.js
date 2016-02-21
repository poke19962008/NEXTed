var mongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var config = require('./config').mongo;
var _ = require("underscore");

var uri = config.uri;

exports.addSkills = function(){
  var skills = JSON.parse(fs.readFileSync('./skills.json', 'utf-8'));

  mongoClient.connect(uri, function(err, db){

    var cur = db.collection('skills').find({}, {"_id": 0});
    cur.toArray(function (err, doc){
      // console.log(doc);
      if(doc.length < 2){
        db.collection('skills').insert({"teacher": skills.teacher});
        db.collection('skills').insert({"student": skills.student});

        console.log("> Added skill sets in `skills` collection.");
      } else if (_.difference(doc[0].teacher, skills.teacher).length != 0 || _.difference(doc[1].student, skills.teacher).length != 0 ){
        console.log(doc[0].teacher);
        console.log(skills.teacher);
        db.collection('skills').insert({"teacher": skills.teacher});
        db.collection('skills').insert({"student": skills.student});

        console.log("> Updated skill set.");
      }else console.log('> Skill set already up to date.');

    });
  });

};
