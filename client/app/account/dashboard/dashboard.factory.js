'use strict';

angular.module('oneDayJobApp')
    .factory("getJob", function($q, $http, Auth) {

        return {
            getMongoStuff: function() {
                var deferred = $q.defer();

                $http.get('/api/jobs/userjob/' + Auth.getCurrentUser().email).success(function(jobs) {
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
                    httpPromise = $http.get('/api/jobs/userapplied/' + Auth.getCurrentUser().email);

                httpPromise.success(function(jobs) {
                    var jobsArray = [];
                    angular.forEach(jobs, function (value, key) {
                        var commsArray = [];
                        angular.forEach(jobs[key].comments, function (valueCom, keyCom) {
                            if(valueCom.email == Auth.getCurrentUser().email){
                                commsArray.push(valueCom);
                            }
                        });
                        if(commsArray.length > 0)
                            jobsArray.push(value);
                    });
                        deferred.resolve(jobsArray);
                    })
                    .error(function(error) {
                        console.error("Error: " + error);
                    });
                return deferred.promise
            }
        };
    });