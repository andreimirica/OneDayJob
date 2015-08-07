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
.controller('MainCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog,$rootScope,$state,$timeout) {
    $scope.tasks = [];
    _scope=$scope;
    $rootScope.$on('searchOn', function(event, data) {
            $rootScope.searchNo=true;
            event.preventDefault();
        if(data){
        taskFactory.getSearchStuff(data)
        .then(function(jobs) {
            $timeout(function(){
                _scope.tasks = jobs;
            },500)
        }),
        function(error) {
            console.error(error);
        }
    }
    else{ 
             taskFactory.getMongoStuff()
    .then(function(jobs) {
        $scope.tasks = jobs;
    }),
    function(error) {
        console.error(error);
    }
            }
    });


    $scope.customer = {
        name: 'David',
        street: '1234 Anywhere St.'
    };

    if(!$rootScope.searchNo){
        taskFactory.getMongoStuff()
        .then(function(jobs) {
            $scope.tasks = jobs;
        }),
        function(error) {
            console.error(error);
        }
    }
    $rootScope.searchNo=false;

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

    $http.get("/api/categories").success(function(response){
        $scope.categories = response;
    });
    $http.get("api/states").success(function(response){
        $scope.locations = response;
    });

    $scope.search={};
    $scope.search.location="";
    $scope.search.category="";
    $scope.clearFilter = function(){
        $scope.search.location ="";
        $scope.search.category="";
    };



});





