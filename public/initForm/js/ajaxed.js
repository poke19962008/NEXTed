
$(document).ready(function(){

  $('#submitt').on('click',function(e) {

    e.preventDefault();
    e.stopPropagation(); // only neccessary if something above is listening to the (default-)event too

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
    console.log("Hello");
  //
  	$.ajax({
  		url:"/api/teacher/update/email",
      type:'POST',
      data: {
  			email: email
  		},
  		success: function(data){
        console.log("first ajax done");

    		$.ajax({
    	  		url:"/api/teacher/update/designation",
            type:'POST',
            data: {
    	  			desig:designation
    	  		},
            success: function(data){
              console.log("second ajax done");

              $.ajax({
                url:"/api/teacher/update/bio",
                type:'POST',
                data: {
                  bio:biography
                },
                success: function(data){
                  console.log("third ajax done");
                  $.ajax({
                    url:"/api/teacher/update"
                  })
                }
              })
            }

    	  	})


      },
      error: function(err){
        console.log("The error is "+ err);
      },
      complete: function(){
        console.log("All requests completed");
      }
  	})


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



  //
  //
