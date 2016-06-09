'use strict';

angular.module('oneDayJobApp')
    .factory("getJoben", function($q, $http) {

        return {
            getMongoStuff: function() {
                var deferred = $q.defer(),
                    httpPromise = $http.get('/api/jobs', {title:"Sapator"});

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