(function(angular){
    var myApp = angular.module('profileApp',[]);
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
    function date2str(date){
      var str=months[date.month-1]+" ";
      str += date.date + " ,";
      str += date.year;

      return str;
    }

    myApp.controller('ProfileCtrl',function($scope){
      $.ajax({
           method: "GET",
           url: "/api/public/getProfile/student",
           data: {
             ID: "123testID"
           }
         }).done(function(msg){
           var name = msg.name.fName;
           name += (msg.name.mName != undefined)? " "+msg.name.mName: "";
           name += (msg.name.lName != undefined)? " "+msg.name.lName: "";

           var dob = date2str(msg.detail.personalInfo.dateOfBirth);

           var designation = msg.detail.designation.class_ + "-";
           designation += msg.detail.designation.section ;

           var awards = msg.detail.award;
           for (var i = 0; i < awards.length; i++) {
             awards[i].date = date2str(awards[i].date);
           }

           var comps = msg.detail.competition;
           for (var i = 0; i < comps.length; i++) {
             comps[i].date = date2str(comps[i].date);
           }

           var email = msg.detail.personalInfo.email;
           var address = msg.detail.personalInfo.address;
           var phone = msg.detail.personalInfo.phone;
           var blog = msg.detail.personalInfo.blog;
           var bio = msg.detail.bio;


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
             $scope.comps = comps;
           });
         });
    });
})(window.angular);
