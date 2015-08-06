'use strict';

angular.module('oneDayJobApp')
    .factory("stateFactory", function($q, $http) {

        return {
            getMongoStuff: function() {
                var deferred = $q.defer(),
                    httpPromise = $http.get('/api/states');

                httpPromise.success(function(states) {
                        deferred.resolve(states);
                    })
                    .error(function(error) {
                        console.error("Error: " + error);
                    });
                return deferred.promise
            }
        };
    });