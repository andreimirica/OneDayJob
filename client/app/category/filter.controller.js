angular.module('oneDayJobApp')
.controller('ListController', function($scope, $route, $location, $http, Categories){

	$scope.sort = function(item) {
		if (  $scope.orderProp == 'date') {
			return new Date(item.date);
		}
		return item[$scope.orderProp];
	}

	$scope.sendCategory = function(category) {
    // How can I pass this value to ItemController?
    $scope.search =category.name;
};

$scope.orderProp='date';

$scope.tab = function (tabIndex) {
     //Sort by date
     if (tabIndex == 1){
        //alert(tabIndex);
        $scope.orderProp='date';

    }   
      //Sort by views 
      if (tabIndex == 2){
      	$scope.orderProp = 'views';
      }

  }
});