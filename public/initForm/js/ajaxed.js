
$(document).ready(function(){

  $('#submitt').on('click',function() {

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
    console.log("Hello");

  	$.ajax({
  		url:"/api/teacher/update/email",
  		data: {
  			email: email
  		},
  		method: 'POST'
  	})
  	.done(function(data){
  		console.log(data);
		console.log("Yes, email worked");

		$.ajax({
	  		url:"/api/teacher/update/designation",
	  		data: {
	  			desig:designation
	  		},
	  		type: 'POST'
	  	})
	  	.done(function(data){
			console.log("Yes,desig worked");
		});

	});




  /*
  $.ajax({
  type:"POST",
  dataType:'json',
  url:"/js/..",
  data:{email:email},
  success:function(data){

  },
  complete:function(){}
});
  */
  });



});

  //
  //
