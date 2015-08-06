'use strict';


angular.module('oneDayJobApp')
    .controller('DashCtrl', function($scope, $http, $location, Auth, getJob, getApplied) {

        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.isLoggedIn = Auth.isLoggedIn;


        getJob.getMongoStuff()
                .then(function(jobs) {
                    $scope.jobs = jobs;
                }),
                function(error) {
                    console.error(error);
                }


         getApplied.getMongoStuff()
                .then(function(jobs) {
                    $scope.applied = jobs;
                }),
                function(error) {
                    console.error(error);
                }

        });