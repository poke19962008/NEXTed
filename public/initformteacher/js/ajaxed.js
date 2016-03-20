
$(document).ready(function(){

  $('#submitt').on('click',function(e) {

    e.preventDefault();


    var designation = $('#q1').val();
    var biography = $('#q2').val();
    var email = $('#q3').val();
    var qdegree = $('#q4').val();
    var qcourse = $('#q5').val();
    var qinstitute = $('#q6').val();
    var awardtitle =$('#q7').val();
    var date1 =$('#q8').val();
  	var awarddescription =$('#q9').val();
  	var skillsstring = $('#q10').val();
  	var exptitle = $('#q11').val();
  	var date2 = $('#q12').val();
  	var expdescribe = $('#q13').val();
  	var skills = skillsstring.split(',');
  	var awarddate = date1.split('/');
  	var expdate = date2.split('/');
  console.log(email);
  console.log(designation);

    var exp = {
                experience: [
                  {
                    title: exptitle,
                    description: expdescribe,
                    date: {
                      date: expdate[0],
                      month:expdate[1],
                      year:expdate[2]
                    }
                  }
                ]
              }

    var qual = {
                  qualification: [
                    {
                      degree: qdegree,
                      course: qcourse,
                      institute: qinstitute
                    }
                  ]
              }
    var award = {
                award: [
                  {
                    title: awardtitle,
                    description: awarddescription,
                    date: {
                      date: awarddate[0],
                      month:awarddate[1],
                      year:awarddate[2]
                    }
                  }
                ]
              }
    var skill = {
                       skill:[skills]
           }

/*
UPDATE EMAIL
*
*
*
*
*
*/
  $.ajax({
    method: "POST",
    url: "/api/teacher/update/email",
    data: { email:email }
    })
    .done(function( msg ) {
      console.log(msg);
    })
    .fail(function() {
    alert( "error" );
  });

/*Update designation
*
*
*
*
*
*/
  $.ajax({
    method:"POST",
    url:"/api/teacher/update/designation",
    data:{ desig:designation}
  })
  .done(function(msg){
    console.log(msg);
  })
  .fail(function(){
    console.log("fail desig: ");
  });

/*Update biography
*
*
*
*
*
*/
  $.ajax({
    method:"POST",
    url:"/api/teacher/update/bio",
    data:{bio:biography}
  })
  .done(function(msg){
    console.log(msg);
  })
  .fail(function(){
    console.log("fail bio : ");
  });

/*update qualification
*
*
*
*
*
*/
  $.ajax({
    method:"POST",
    url:"/api/teacher/update/add/qualification",
      data:qual,
  })
  .done(function(msg){
    console.log(msg);
  })
  .fail(function(){
    console.log("fail qualification")
  });

/*update experience
*
*
*
*
*
*/
  $.ajax({
    method:"POST",
    url:"/api/teacher/update/add/experience",
      data :exp,
})
  .done(function(msg){
    console.log(msg);
  })
  .fail(function(msg){
      console.log("experience fails");
  })
/**
update award
*
*
*
*
*
*/




  $.ajax({
      method:"POST",
      url:"/api/teacher/update/add/award",
      data: award,
  })
  .done(function(msg){
      console.log(msg);
  })
  .fail(function(msg){
    console.log(msg);
  })
/*
*
* Update skills
*
*
*/

$.ajax({
  method:"POST",
  url:"/api/teacher/addSkill",
  data: skill,
})
.done(function(msg){
  console.log(msg);
})
.fail(function(msg){
  console.log(msg);
})








  });




  });
