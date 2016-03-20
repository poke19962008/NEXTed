
$(document).ready(function(){

  $('#submitt').on('click',function(e) {

    e.preventDefault();


    
    var biography = $('#q2').val();
    var email = $('#q3').val();
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
 

    var exp = {
                competition: [
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
    url: "/api/student/update/email",
    data: { email:email }
    })
    .done(function( msg ) {
      console.log(msg);
    })
    .fail(function() {
    alert( "error" );
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
    url:"/api/student/update/bio",
    data:{bio:biography}
  })
  .done(function(msg){
    console.log(msg);
  })
  .fail(function(){
    console.log("fail bio : ");
  });


/*update experience/Competition
*
*
*
*
*
*/
  $.ajax({
    method:"POST",
    url:"/api/student/update/add/competition",
      data :exp,
})
  .done(function(msg){
    console.log(msg);
  })
  .fail(function(msg){
      console.log("competition fails");
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
      url:"/api/student/update/add/award",
      data: award,
  })
  .done(function(msg){
      console.log(msg);
  })
  .fail(function(msg){
    console.log(msg);
  })
 

 /**
Update skills
*
*
*
**
*
*
*
*/
$.ajax({
  method:"POST",
  url:"/api/student/addSkill",
  data: skill,
})
.done(function(msg){
  console.log("Skill requesting"+msg);
})
.fail(function(msg){
  console.log("Skill error"+msg);
})








  });




  });
