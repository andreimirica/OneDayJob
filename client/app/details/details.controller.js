'use strict';

angular.module('oneDayJobApp')

.controller('DetailsCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog, $stateParams, Job) {
    $scope.job = Job.query({id: $stateParams.id});
})