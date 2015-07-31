'use strict';


angular.module('oneDayJobApp')
.controller('PostCtrl', function($scope, $http,$location, Auth) {

    //     $scope.submit_form = function ($scope) {

    //     window.alert("sometext");
    // };
     $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.addJob = function() {
    	if($scope.newJob === '') {
    		return;
    	}
    	$http.post('/api/jobs', 
    		{ title: $scope.newTitle,
    			description : $scope.newDescription,
    			owner : $scope.getCurrentUser().name,
    			location : $scope.ctrl.userState,
    			category : $scope.newCategory,
    			manpower: $scope.project.rate2,
    			minpaycheck: $scope.project.rate,
    			maxpaycheck: $scope.project.rate1,
    			startDate : $scope.newStartDate.setDate($scope.newStartDate.getDate() + 1),
    			// endDate : $scope.newEndDate,
    			PostStartDate : $scope.newPostStartDate.setDate($scope.newPostStartDate.getDate() + 1)
    			// PostEndDate : $scope.user.submissionDate2
    		});
    	$scope.newJob = '';

          // redirect to home
          $location.path('/');
        
    };

    this.userState = 'Arad';
    this.states = ('Arad Bacău Brăila Brașov Bucureşti Buzau Cluj-Napoca Constanța Craiova Iași Oradea Pitești Ploiești Satu-Mare Sibiu Târgu-Mureș Timișoara'
    	).split(' ').map(function (state) { return { abbrev: state };
    });
    });

