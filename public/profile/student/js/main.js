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
                  "December"]

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

           var dob=months[msg.detail.personalInfo.dateOfBirth.month-1]+" ";
           dob += msg.detail.personalInfo.dateOfBirth.date + " ,";
           dob += msg.detail.personalInfo.dateOfBirth.year;

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
           });
         });
    });
})(window.angular);
