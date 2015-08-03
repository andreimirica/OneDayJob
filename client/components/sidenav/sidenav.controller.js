'use strict';

angular.module('oneDayJobApp')
    .controller('sidenavCtrl', function($scope, $location, Auth, $mdSidenav) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];


        $scope.getCurrentUser = Auth.getCurrentUser;


    });