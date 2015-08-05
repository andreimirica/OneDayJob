'use strict';


angular.module('oneDayJobApp')
    .controller('UserpageCtrl', function($scope, $http, $location, Auth, getJob) {

        //     $scope.submit_form = function ($scope) {

        //     window.alert("sometext");
        // };
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.isLoggedIn = Auth.isLoggedIn;


        getJob.getMongoStuff()
                .then(function(jobs) {
                    $scope.job = jobs;
                }),
                function(error) {
                    console.error(error);
                }

        });