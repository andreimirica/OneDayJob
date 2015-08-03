'use strict';

angular.module('oneDayJobApp')
    .factory("getCat", function($q, $http) {

        return {
            getMongoStuff: function() {
                var deferred = $q.defer(),
                    httpPromise = $http.get('/api/categories');

                httpPromise.success(function(jobs) {
                        deferred.resolve(jobs);
                    })
                    .error(function(error) {
                        console.error("Error: " + error);
                    });
                return deferred.promise
            }
        };
    });