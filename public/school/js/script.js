$(document).ready(function(){

$('#award').click(function(){
	var page = $(this).attr('href');
	
	$('#outerdiv').load(page+'.php');
	return false;
});

});