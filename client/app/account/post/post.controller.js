'use strict';


angular.module('oneDayJobApp')
    .controller('PostCtrl', function($scope, $http, $location, Auth, getCat) {

        //     $scope.submit_form = function ($scope) {

        //     window.alert("sometext");
        // };
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.currentDate = new Date();
        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.addJob = function() {
            if ($scope.newJob === '') {
                return;
            }
            $http.post('/api/jobs', {
                title: $scope.newTitle,
                description: $scope.newDescription,
                owner: $scope.getCurrentUser().email,
                location: $scope.ctrl.userState,
                category: $scope.ctrl.category,
                helpers: $scope.helpers,
                paycheck: $scope.paycheck,
                jobDate: $scope.newJobDate.setDate($scope.newJobDate.getDate() + 1)
            });
            $scope.newJob = '';

            // redirect to home
            $location.path('/');
        };
        getCat.getMongoStuff()
            .then(function(categories) {
                $scope.cat = categories;
            }),
            function(error) {
                console.error(error);
            }

        this.userState = '';
        this.states = ('Arad Bacău Brăila Brașov Bucureşti Buzau Cluj-Napoca Constanța Craiova Iași Oradea Pitești Ploiești Satu-Mare Sibiu Târgu-Mureș Timișoara')
            .split(' ').map(function(state) {
                return {
                    abbrev: state
                };
            });
    });