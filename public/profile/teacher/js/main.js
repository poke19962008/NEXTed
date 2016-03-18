(function(angular){
    var myApp = angular.module('profileApp',[]);
    var ID = $("meta[type=teacher]").attr("id");
    var months = ["January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December"];

    // Get the value of cookie
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
      }
      return "";
    }


    // Method for converting date to string
    function date2str(date){
      var str=months[date.month-1]+" ";
      str += date.date + " ,";
      str += date.year;

      return str;
    }

    function str2date(str){
      var date = {};
      date = {
        date: Number(str.split(" ,")[0].split(" ")[1]),
        month: months.indexOf(str.split(" ")[0])+1,
        year: Number(str.split(" ,")[1])
      };

      return date;
    }

    // Method for proper name binding
    function encName(name){
      var str = name.fName;
      str += (name.mName != undefined)? " "+name.mName: "";
      str += (name.lName != undefined)? " "+name.lName: "";
      return str;
    }

    myApp.controller('ProfileCtrl',function($scope){
      var ID = $("meta[type=teacher]").attr("ID");
      // Get User Profile Data
      $.ajax({
           method: "GET",
           url: "/api/public/getProfile/teacher",
           data: {
             ID: ID
           }
         }).done(function(msg){
           var name = encName(msg.name);

           var dob = date2str(msg.detail.personalInfo.dateOfBirth);

           var designation = msg.detail.designation;

           var awards = msg.detail.award;
           for (var i = 0; i < awards.length; i++) {
             awards[i].date = date2str(awards[i].date);
           }

           var xps = msg.detail.experience;
           for (var i = 0; i < xps.length; i++) {
             xps[i].date = date2str(xps[i].date);
           }

           var skills = msg.detail.skills;
           for (var i = 0; i < skills.length; i++) {
             skills[i].index = i;
             for (var j = 0; j < skills[i].endorser.length; j++) {
               skills[i].endorser[j].name = encName(skills[i].endorser[j].name);
             }
           }

           var email = msg.detail.personalInfo.email;
           var address = msg.detail.personalInfo.address;
           var phone = msg.detail.personalInfo.phone;
           var blog = msg.detail.personalInfo.blog;
           var bio = msg.detail.bio;

           // Angular scope variables
           $scope.$apply(function(){
             $scope.name = name;
             $scope.dateOfBirth = dob;
             $scope.email = email;
             $scope.address = address;
             $scope.phone = phone;
             $scope.blog = blog;
             $scope.bio = bio;
             $scope.designation = designation;
             $scope.awards = awards;
             $scope.xps = xps;
             $scope.skills = skills;
           });


           // Populate with endorser
           $("#endList").click(function(){
             var index = $(this).attr('index');
              $scope.$apply(function(){
                $scope.ends = skills[index].endorser;
              });
           });

           // Add animation to each .myButton
           $(".myButton").each(function(){
             moAnimate(this);
           });


           $(".removeObjConfirm").click(function (){
             var parent = $(this).parent()
                               .parent();
              var catg = $(parent).attr("class").split(" ");
              if(catg.indexOf("awards") != -1) catg = "award";
              else catg = "experience";
              var data ={};
              data[catg] =  [{
                title: $(parent).find("h3").text(),
                description: $(parent).find("p").text(),
                date: str2date($(parent).find("small").text())
              }];

             $("#confirmModal").modal("show");

            //  console.log(data);
             $("#yesBtn").click(function(){
               $.ajax({
                 method: "POST",
                 url: "/api/teacher/update/remove/"+catg,
                 data: data
               })
               .done(function(msg){
                 if(msg.status == "success"){
                   console.log("success");
                   $("#confirmModal").modal("hide");
                   location.reload();
                 }else{
                   console.log(msg);
                 }
               });
             });

             $("#noBtn").click(function (){
               console.log("failed");
               $("#confirmModal").modal("hide");
             });
           });

         });
    });
})(window.angular);

// MO Animation configuration
function moAnimate(item){

  function isIOSSafari() {
      var userAgent;
      userAgent = window.navigator.userAgent;
      return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
  };

  function isTouch() {
      var isIETouch;
      isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
  };
  var isIOS = isIOSSafari(),
      clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';
  function extend( a, b ) {
      for( var key in b ) {
          if( b.hasOwnProperty( key ) ) {
              a[key] = b[key];
          }
      }
      return a;
  }
  function Animocon(el, options) {
      this.el = el;
      this.options = extend( {}, this.options );
      extend( this.options, options );

      this.checked = false;

      this.timeline = new mojs.Timeline();

      for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
          this.timeline.add(this.options.tweens[i]);
      }

      var self = this;
      this.el.addEventListener(clickHandler, function() {
          if( self.checked ) {
              self.options.onUnCheck();
          }
          else {
              self.options.onCheck();
              self.timeline.start();
          }
          self.checked = !self.checked;
      });
  }
  var el10 = item.querySelector('button.icobutton'), el10span = el10.querySelector('span'), el10counter = el10.querySelector('span.icobutton__text');
  var opacityCurve10 = mojs.easing.path('M1,0 C1,0 26,100 51,100 C76,100 101,0 101,0');
  var translationCurve10 = mojs.easing.path('M0,100 C0,0 50,0 50,0 L50,100 L50,200 C50,200 50,100 100,100');
  var colorCurve10 = mojs.easing.path('M0,100 L50,100 L50,0 L100,0');
  new Animocon(el10, {
      tweens : [
          // burst animation
          new mojs.Burst({
              parent: el10,
              duration: 600,
              shape : 'circle',
              fill: '#C0C1C3',
              x: '50%',
              y: '50%',
              opacity: 0.6,
              childOptions: {
                  radius: {30:0},
                  type: 'line',
                  stroke: '#6F97F7',
                  strokeWidth: {1:2}
              },
              radius: {80:130},
              degree: 90,
              angle: 135,
              count: 6,
              isRunLess: true,
              easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
          }),
          // icon scale animation
          new mojs.Tween({
              duration : 400,
              easing: mojs.easing.ease.out,
              onUpdate: function(progress) {
                  var opacityProgress = opacityCurve10(progress);
                  el10span.style.opacity = opacityProgress;

                  var translationProgress = translationCurve10(progress);
                  el10span.style.WebkitTransform = el10span.style.transform = 'translate3d(0,' + -150 * translationProgress + '%,0)';

                  var colorProgress = colorCurve10(progress);
                  el10.style.color = colorProgress ? '#6F97F7' : '#C0C1C3';
              }
          })
      ],
      onCheck : function() {
          el10counter.innerHTML = Number(el10counter.innerHTML) + 1;
      },
      onUnCheck : function() {
          el10.style.color = '#C0C1C3';

          var current = Number(el10counter.innerHTML);
          el10counter.innerHTML = current > 1 ? Number(el10counter.innerHTML) - 1 : '';
      }
  });
}

// Add awards Function
$("#awardSubmit").click(function (){
  $.ajax({
    method: "POST",
    url: "/api/teacher/update/add/award",
    data: {
      award: [{
          title: $("#award").val(),
          description: $("#awardDescription").val(),
          date: {
            date: Number($("#awardDate").val()),
            month: Number($("#awardMonth").val()),
            year: Number($("#awardYear").val())
          }
        }]
    }
  })
  .done(function(msg){
    if(msg.status == "success"){
      console.log("success");
      location.reload();
    }else{
      // Toast for Inv. Format
    }
  });
});

// Update Qualification
$("#xpSubmit").click(function (){
  $.ajax({
    method: "POST",
    url: "/api/teacher/update/add/experience",
    data: {
      experience: [{
        title: $("#xp").val(),
        description: $("#descriptionXp").val(),
        date: {
          date: $("#dateXp").val(),
          month: $("#monthXp").val(),
          year: $("#yearXp").val()
        }
      }]
    }
  })
  .done(function(msg){
    if(msg.status == "success"){
      console.log("success");
      location.reload();
    }else{
      // Toast for Inv. Format
    }
  });
});

// Bio Edit function
$("#bioP").click(function(){
  try{
    var self = $("meta[type=teacher]").attr("self");
    if(self == "false") throw true;

    var saveBtn = "<button class=\"saveEditBtn\" id=\"bioSaveBtn\">Save</button>";
    var height = $(this).css("height");
    var P = $(this).text();

    $(this).remove();
    $("#bioDiv").prepend("<textarea id=\"bioT\"></textarea>");
    $("#bioT").css({
      "height": height,
    });
    $("#bioT").text(P);
    $("#bioCenter").append(saveBtn);

    $(".saveEditBtn").click(function(){
      console.log("hello");
      $.ajax({
        method: "POST",
        url: "/api/teacher/update/bio",
        data: {
          bio: $("#bioT").val()
        }
      })
      .done(function(msg){
        if(msg.status == "success"){
          location.reload();
        }
      });
    });
  } catch(e){
    // add toastr
    console.log("Not authorised");
  }
});
