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
  	var json ='{'+'"email":email,'+
  		'"desig":designation,'+
  		'"bio":biography,'+
  		'"qualification": +{
  			'"degree":degree,'+
  			'"course":course,'+
  			'"institute":institute'
  		},'
  		"experience": +'{'
  			'"title":exptitle,'+
  			'"description":expdescribe,'+
  			"date":+'{'
  				'"date":expdate[0],'+
  				'"month":expdate[1],'+
  				'"year":expdate[2]'
  			+'}' 			
  		+'}',
  		"award":+'{'
  			'"title":awardtitle,'+
  			'"description":awarddescription,'+
  			"date":+'{'
  				'"date":awarddate[0],'+
  				'"month":awarddate[1],'+
  				'"year":awarddate[2]'
  			+'}' 			
  		+'}'
  	+'}'
  	var newjson = JSON.parse(json);

  	console.log(newjson);
  });

});