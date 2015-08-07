'use strict';

angular.module('oneDayJobApp')
    .controller('NavbarCtrl', function($scope, $location, Auth, $mdSidenav,$rootScope,$state) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];
// $state.go('main');
        $scope.searchTerm='';
        
        $scope.search=function(){
          $rootScope.$emit('searchOn', $scope.searchTerm);
          $location.path('/').search($scope.searchTerm);
        };
        $scope.showSearch = false;
        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.toggleList = toggleUsersList;

        $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
        };

        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });