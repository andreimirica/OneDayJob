angular.module('oneDayJobApp').filter('cut', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
});



angular.module('oneDayJobApp')

.controller('MainCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog) {

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

});