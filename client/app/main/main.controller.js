'use strict';

angular.module('oneDayJobApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeJobs = [];

    $http.get('/api/jobs').success(function(awesomeJobs) {
      $scope.awesomeJobs = awesomeJobs;
      socket.syncUpdates('job', $scope.awesomeJobs);
    });

    $scope.addJob = function() {
      if($scope.newJob === '') {
        return;
      }
      $http.post('/api/jobs', { Title: $scope.newJob });
      $scope.newJob = '';
    };

    $scope.deleteJob = function(job) {
      $http.delete('/api/jobs/' + job._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('job');
    });


$scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

  });
