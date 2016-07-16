'use strict';

angular.module('oneDayJobApp')

.controller('DetailsCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog, $stateParams, Job,User, JobLocation, UserByEmail) {

    $scope.job = Job.get({id: $stateParams.id});
    $scope.getCurrentUser=Auth.getCurrentUser();
    $scope.user = $scope.getCurrentUser;
    $scope.map = { center: { latitude: 45, longitude: 25 }, zoom: 7,
        events : {
            click: function (map, eventName, handlerArgs) {
                if($scope.getCurrentUser.role === 'admin' || $scope.getCurrentUser.email == $scope.ownerOfJob.email){
                    $scope.$apply(function () {
                        $scope.job.coords = {
                            id: $scope.job._id,
                            latitude: handlerArgs[0].latLng.lat(),
                            longitude: handlerArgs[0].latLng.lng()
                        };
                        JobLocation.setPlace({id: $stateParams.id},$scope.job.coords);
                    });
                }
            }
        }
    };

    $scope.showIfOwner = false;

    $scope.numberOfStars = {
        currentNumber: 0
    };

    $scope.rateComment = function (currentUs) {
        $http.post('api/jobs/rateComments',{
            _id: currentUs._id,
            jobId: $scope.job._id,
           rating: currentUs.rating,
            raterId: $scope.user._id
        }).then(
            function (response) {
                $scope.applicants=[];
                $scope.job.$promise.then(function(res){
                    for ($scope.i in res.comments){
                        User.getUserComments({id: res.comments[$scope.i]._id}).$promise.then(function (resp) {
                            $scope.user2 = resp;
                            $scope.applicants.push($scope.user2);
                        });
                    }
                    $scope.job = response.data;
                });
            }
        );
    };

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
              $scope.job.helpers += 1;
          }
        else 
          {
              if($scope.job.helpers > 0){
                  $scope.list.push(item);
                  $scope.job.helpers -= 1;
              }
          }
      };
      $scope.exists = function (item, list) {

        return $scope.list.indexOf(item) > -1;

      };



      $scope.confirmApplicants =function(){
          $http.put('api/jobs/'+ $stateParams.id,{
              _id:$stateParams.id,
              acceptedList:$scope.list
          });
      };


    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.commentText = '';
    $scope.newComment={};

    $scope.applicants=[];
    $scope.job.$promise.then(function(res){
        $scope.ownerOfJob = UserByEmail.getByEmail({id: $scope.job.owner});
        for ($scope.i in res.comments){
          User.getUserComments({id: res.comments[$scope.i]._id}).$promise.then(function (resp) {
              $scope.user2 = resp;
              $scope.applicants.push($scope.user2);
          });
      }
    });


    $scope.addComment = function() {
        $scope.job.comments.push({email: $scope.getCurrentUser.email, _id:$scope.getCurrentUser._id, phone: $scope.getCurrentUser.phone, photo: $scope.getCurrentUser.photo, owner:$scope.getCurrentUser.firstName + ' ' + $scope.getCurrentUser.lastName, text:$scope.commentText});
        $http.put('api/jobs/'+ $stateParams.id + '/comments',{
            _id:$stateParams.id,
            newComment:$scope.commentText,
            userName:$scope.getCurrentUser.firstName + ' ' + $scope.getCurrentUser.lastName,
            userId:$scope.getCurrentUser._id,
            photo: $scope.getCurrentUser.photo,
            phone: $scope.getCurrentUser.phone,
            email: $scope.getCurrentUser.email
        });
        $scope.commentText='';
        $scope.job.$promise.then(function(res){
            for ($scope.i in res.comments){
                User.getUserComments({id: res.comments[$scope.i]._id}).$promise.then(function (resp) {
                    $scope.user2 = resp;
                    $scope.applicants.push($scope.user2);
                });
            }
        });
    };
})