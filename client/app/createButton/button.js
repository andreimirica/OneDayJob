angular.module('oneDayJobApp').directive('myButton', function () {
    return {
        template: '<md-button style="right:20px; bottom: 10px" layout-sm="column" layout-align-sm="end end" class="md-fab md-warn md-hue-2 newJob" aria-label="Profile" ng-show="isLoggedIn()" ng-click="showModal($event)">'+

        '<md-tooltip>Add new job</md-tooltip>'+
       ' +'+
    '</md-button>'
    };
});