'use strict';

angular.module('oneDayJobApp')

.controller('DetailsCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog, $stateParams, Job,User) {

    $scope.job = Job.get({id: $stateParams.id});

    $scope.test = false;
    $scope.isOwner=function(){
        $scope.job.$promise.then(function(response){
            if ($scope.getCurrentUser()._id == response.owner){
                $scope.test = true;
            }
        })
    }
    $scope.isOwner();



      $scope.selected = [];
      $scope.toggle = function (item, list) {


        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
      };
      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };


    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser=Auth.getCurrentUser;
    $scope.commentText = '';
    $scope.newComment={};

    $scope.applicants=[];
    $scope.job.$promise.then(function(res){

        for ($scope.i in res.applicants){
          $scope.user2 = User.get({id: res.applicants[$scope.i]});
         $scope.applicants.push($scope.user2);

      }
    })
    

    $scope.addComment = function() {
        // if($scope.job.applicants.indexOf($scope.getCurrentUser()._id)<0)
        // {
        //     $scope.job.applicants.push($scope.getCurrentUser().firstName);
        // }
    	
        $scope.job.comments.push({owner:$scope.getCurrentUser().firstName, text:$scope.commentText});
        $http.put('api/jobs/'+ $stateParams.id,{
            _id:$stateParams.id,
            newComment:$scope.commentText,
            userName:$scope.getCurrentUser().firstName,
            userId:$scope.getCurrentUser()._id,

        });
        $scope.commentText='';
    };
       $scope.job.$promise.then(function(response){
       $scope.temp = response.owner;
       $scope.user = User.get({id: $scope.temp});

   });
})