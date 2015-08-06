'use strict';

angular.module('oneDayJobApp')

.controller('DetailsCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog, $stateParams, Job) {

    $scope.job = Job.query({id: $stateParams.id});


    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser=Auth.getCurrentUser;
    $scope.commentText = '';
    $scope.newComment={};
    $scope.addComment = function() {
    	
        // if($scope.commentText!=''){
        //     $scope.newComment.commentText=$scope.commentText;
        //     $scope.newComment.userPost=$scope.getCurrentUser().firstName;
        //     Job.addComment({id: $stateParams.id, newComment:$scope.newComment});
        //     $scope.commentText='';
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

})