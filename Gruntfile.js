var http = require('http');
var request = require('request');
var mongoClient = require('mongodb').MongoClient;
var mongoURI = require("./config").mongo.uri;

function sendReq(opts, type, done){
  request(opts.host + opts.path, function (err, res){
    if(err) console.log(err);
    else{
      if(res.body == "Added Successfully") console.log("[SUCCESS]: Added Dummy " + type);
      else console.log("[FAILED]: Failed to Add Dummy " + type);
    }
    done();
  });
};

module.exports = function(grunt){
  var opts = {
    host: "http://" + (process.env.IP || "0.0.0.0") + ":" + (process.env.PORT || 3000),
    method: "GET",
  };

  grunt.registerTask("addTeacher", function(){
    var done = this.async();
    opts.path = "/api/teacher/createDummyUser";
    sendReq(opts, "Teacher", done);
  });

  grunt.registerTask("addStudent", function(){
    var done = this.async();
    opts.path = "/api/student/createDummyUser";
    sendReq(opts, "Teacher", done);
  });

  grunt.registerTask("addCompetition", function(){
    var done = this.async();
    opts.path = "/api/competition/addDummyComp";
    sendReq(opts, "Competition", done);
  });

  grunt.registerTask("addDummy", ["addTeacher", "addStudent", "addCompetition"]);

  grunt.registerTask("rmDummy", function(){
    var done = this.async();
    mongoClient.connect(mongoURI, function(err, db){
      if(err) throw err;
      else{
        // Remove pre-existing  `competitions` collection
        db.collection('competitions').drop(function(err, response){ if(err) console.log("[ERROR]: Failed to drop competitions"); else console.log("[SUCCESS]: Dropped competitions collection.");});

        // Remove pre-existing  `teachers` collection
        db.collection('teachers').drop(function(err, response){ if(err) console.log("[ERROR]: Failed to drop teachers"); else console.log("[SUCCESS]: Dropped teachers collection.");});
        db.collection('teacherdetails').drop(function(err, response){ if(err) console.log("[ERROR]: Failed to drop teacherdetails"); else console.log("[SUCCESS]: Dropped teacherdetails collection.");});

        // Remove pre-existing  `students` collection
        db.collection('students').drop(function(err, response){ if(err) console.log("[ERROR]: Failed to drop students"); else console.log("[SUCCESS]: Dropped students collection.");});
        db.collection('studentdetails').drop(function(err, response){ if(err) console.log("[ERROR]: Failed to drop studentdetails"); else console.log("[SUCCESS]: Dropped studentdetails collection."); db.close(done);});

      }
    });
  });
};
