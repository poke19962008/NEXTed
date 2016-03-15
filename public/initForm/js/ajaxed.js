$(document).ready(function() {
  
  $('.fs-continue').click(function(event) {
    var designation = $('#q1').val();
    var biography = $('#q2').val();
    var email = $('#q3').val();
    var degree = $('#q4').val();
    var course = $('#q5').val();
    var institute = $('#q6').val();
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
  	
  	$.ajax({
  		url:"/api/teacher/update/email",
  		data: {
  			email: email
  		},
  		dataType: 'json',
  		async: true,
  		method: 'POST'
  	})
  	.done(function(data){
		console.log("Yes, email worked");
	});


  	$.ajax({
  		url:"/api/teacher/update/designation",
  		data: {
  			desig:designation
  		},
  		dataType: 'json',
  		async:true,
  		type: 'GET'
  	})
  	.done(function(data){
		console.log("Yes,desig worked");
	});  	
  });

});