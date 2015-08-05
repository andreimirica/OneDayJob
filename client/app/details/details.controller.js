'use strict';

angular.module('oneDayJobApp')

.controller('DetailsCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog, $stateParams, Job) {
    $scope.job = Job.get({id: $stateParams.id});
})