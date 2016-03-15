$(document).ready(function(){
  // False: X, True: ✓
  var toggleSwitch = false;
  $(".colorful-switch__label").click(function(){
    toggleSwitch = !toggleSwitch;
  });

  function validateFields(){
    var ID = $("#login__username").val();
    var password = $("#login__password").val();

    if(ID != "" && password != "") return true;
    else return false;
  }

  function logOut(cb){
    $.ajax({
      method: "GET",
      url: (!toggleSwitch)?
       "/api/teacher/logout":
       "/api/student/logout",
    }).done(function(msg){
      if(msg.status == "success") cb("success");
      else cb("ise");
    });
  }

  $(".form--login").submit(function(e) {
    e.preventDefault();
    if(validateFields()){
      $.ajax({
        method: "GET",
        url: (toggleSwitch)?
         "/api/teacher/login":
         "/api/student/login",
         data: {
           ID: $("#login__username").val(),
           password: $("#login__password").val()
         }
      }).done(function(msg){
        if(msg.status == "failed") {
          toastr.error('Wrong Username or Password.');
        }
        else if(msg.status == "ise") {
          toastr.error('Internal Server Error.');
        }
        else if(msg.status == "success"){
          if(msg.tStamp == -1) window.location = "../update";
          else {
            var type = (toggleSwitch)?
             "teacher":
             "student";
            window.location = "../profile/"+type;
          }
        }
        else if (!msg.isValidUser && msg.isValidUser != undefined) {
          console.log("herer");
          logOut(function(status){
            if(status == "success") {
              console.log("logged out");
              $(".form--login").submit();
            }
            else {
              toastr.error("Not able to logout.");
            }
          });
        }
      }).fail(function(){
        toastr.error("Unable to connect.");
      });
    }
  });
});
