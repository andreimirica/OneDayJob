'use strict';

angular.module('oneDayJobApp')
    .factory("getJob", function($q, $http, Auth) {

        return {
            getMongoStuff: function() {
                var deferred = $q.defer(),
                    httpPromise = $http.get('/api/jobs/userjob/' + Auth.getCurrentUser()._id);

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

angular.module('oneDayJobApp')
    .factory("getApplied", function($q, $http, Auth) {

        return {
            getMongoStuff: function() {
                var deferred = $q.defer(),
                    httpPromise = $http.get('/api/jobs/userapplied/' + Auth.getCurrentUser()._id);

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