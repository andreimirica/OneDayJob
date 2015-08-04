'use strict';

angular.module('oneDayJobApp')

    .controller('MainCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog) {

        $scope.awesomeThings = [];

        $http.get('/api/things').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
            socket.syncUpdates('thing', $scope.awesomeThings);
        });

        $scope.addThing = function() {
            if ($scope.newThing === '') {
                return;
            }
            $http.post('/api/things', {
                name: $scope.newThing
            });
            $scope.newThing = '';
        };

        $scope.deleteThing = function(thing) {
            $http.delete('/api/things/' + thing._id);
        };

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('thing');
        });

        $scope.tasks = {};
        taskFactory.getMongoStuff()
            .then(function(jobs) {
                $scope.tasks = jobs;
            }),
            function(error) {
                console.error(error);
            }
        $scope.isLoggedIn = Auth.isLoggedIn;


        $scope.alert = '';
        $scope.showModal = function(ev) {
            $mdDialog.show({
              controller: ModalController,
              templateUrl: 'app/main/modal/modal.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
          })
        };

        function ModalController($scope, $mdDialog) {
          $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
        $mdDialog.hide(answer);
  };
    };

    }
);







