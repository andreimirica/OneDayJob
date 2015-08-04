'use strict';

angular.module('oneDayJobApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('details', {
                url: '/details',
                templateUrl: 'app/details/details.html',
                controller: 'DetailsCtrl'
            });
    });


//     title: String,
//     description: String,
//     owner: String,
//     location: String,
//     category: String,
//     helpers: Number,
//     paycheck: Number,
//     jobDate: Date,
//     accepted: [],
//     applicants: [],
//     comments: [],
//     createdAt: Date
// });

// module.exports = mongoose.model('Job', JobSchema);
