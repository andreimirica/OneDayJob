'use strict';

angular.module('oneDayJobApp')

.controller('DetailsCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog, $stateParams, Job,User) {

    $scope.job = Job.get({id: $stateParams.id});
    $scope.getCurrentUser=Auth.getCurrentUser();

    $scope.showIfOwner = false;
    $scope.isOwner=function(){
        $scope.job.$promise.then(function(response){
            if ($scope.getCurrentUser.email == response.owner){
                $scope.showIfOwner = true;
            }
        })
    }
    $scope.isOwner();


      $scope.list=[];
      $scope.selected = [];
      $scope.toggle = function (item) {


        var idx = $scope.list.indexOf(item);
        if (idx > -1) 
          {
            $scope.list.splice(idx, 1);
          }
        else 
          {
            $scope.list.push(item);
          }
      };
      $scope.exists = function (item, list) {

        return $scope.list.indexOf(item) > -1;

      };



      $scope.confirmApplicants =function(){
        $scope.job.$promise.then(function(response){
          for (var x in $scope.list)
          {
             $scope.list[x].$promise.then(function(resp){
             $http.put('api/jobs/'+ $stateParams.id,{
              _id:$stateParams.id,
               acceptedList:$scope.list[x]._id,
              })
          })
          }


        })
      }


    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.commentText = '';
    $scope.newComment={};

    $scope.applicants=[];
    $scope.job.$promise.then(function(res){

        for ($scope.i in res.applicants){
          User.get({id: res.applicants[$scope.i]}).$promise.then(function (resp) {
              $scope.user2 = resp;
              $scope.applicants.push($scope.user2);
          });
      }
    });
    

    $scope.addComment = function() {
        // if($scope.job.applicants.indexOf($scope.getCurrentUser()._id)<0)
        // {
        //     $scope.job.applicants.push($scope.getCurrentUser().firstName);
        // }
    	
        $scope.job.comments.push({owner:$scope.getCurrentUser.firstName, text:$scope.commentText});
        $http.put('api/jobs/'+ $stateParams.id + '/comments',{
            _id:$stateParams.id,
            newComment:$scope.commentText,
            userName:$scope.getCurrentUser.firstName,
            userId:$scope.getCurrentUser._id
        });
        $scope.commentText='';
    };
       $scope.job.$promise.then(function(response){
       $scope.temp = response.owner;
       User.get({id: $scope.temp}).$promise.then(function (resp) {
           $scope.user = resp;
       });

   });
})