'use strict';

angular.module('oneDayJobApp')
    .controller('MainCtrl', function($scope, $http, socket, Auth, taskFactory,$mdDialog) {
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



//----------------------------------------------------------
          $scope.alert = '';
         $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title('This is an alert title')
        .content('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };




  //-------------------------------------------------------------
    }
);








app.controller('AppCtrl', ['$scope', '$mdDialog', function($scope, $mdDialog){
  var alert;
  $scope.showDialog = showDialog;
  $scope.items = [1,2,3];
  

}])
