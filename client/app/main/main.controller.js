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
    .controller('MainCtrl', function($scope, $http, socket, Auth, taskFactory, $mdDialog, $rootScope, $state, $timeout, Job, leafletData) {
        $scope.isAdmin = Auth.isAdmin;
        $scope.currentUser = Auth.getCurrentUser;
        $scope.tasks = [];
        _scope=$scope;
        var self = this;
        self.options = {
            zoomLevel: null,
            map: null,
            pointOnMap: null,
            mozilla: {
                xpos: 0,
                ypos: 0
            },
            userMarker: null
        };
        var popup = L.popup({offset: L.point(0, -60, false)});

        self.locateUser = function (args, map) {

            var userMarker;
            self.options.userLocation = args.leafletEvent.latlng;

            var markerOpts = {
                name: 'Me',
                draggable: true,
                icon: L.icon({
                    iconUrl: 'assets/icons/pins-07.svg',
                    iconSize: [40, 64],
                    iconAnchor: [20, 64]
                })
            };


            if (!self.options.userMarker) {
                //get user location and pin in to map
                userMarker = L.marker([self.options.userLocation.lat, self.options.userLocation.lng], markerOpts);
                angular.extend(map.layers.baselayers, {
                    Me: {
                        name: "Me",
                        type: "xyz",
                        visible: true,
                        url: 'https://api.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicXVhbGl0YW5jZSIsImEiOiJkYTY0ODQzMGM1MDFlOGVhM2FiZjc3M2ZkYmQ2MjA0NSJ9.3bxLXwcDaG_V0H3reJzLBg',
                        "layerOptions": {
                            continuousWorld: true,
                            subdomains: ['a', 'b', 'c']
                        }
                    }
                });
                // make user pin on top
                userMarker.setZIndexOffset(9999999);
                userMarker.addTo(self.options.map);
                userMarker.on("dragend", function (event) {
                    $rootScope.location = event.target._latlng;
                });
                self.options.userMarker = userMarker;
            } else {
                self.options.userMarker.setLatLng(args.leafletEvent.latlng);
            }

            return self.options.userMarker;
        };

        $scope.regionBounds = {
            southWest: {
                lat: 43.635167,
                lng: 20.025397
            },
            northEast: {
                lat: 49.4,
                lng: 30.264654
            }
        };

        $scope.map = {
            defaults: {
                //tileLayer: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                tileLayer: 'https://api.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicXVhbGl0YW5jZSIsImEiOiJkYTY0ODQzMGM1MDFlOGVhM2FiZjc3M2ZkYmQ2MjA0NSJ9.3bxLXwcDaG_V0H3reJzLBg',
                maxZoom: 18,
                minZoom: 8,
                zoomControlPosition: 'bottomleft'
            },
            maxbounds: $scope.regionBounds,
            events: {
                map: {
                    enable: ['load', 'locationfound', 'popupopen'],
                    logic: 'emit'
                }
            },
            center: {},
            layers: {
                baselayers: {}
            }
        };
        
        leafletData.getMap().then(function (map) {
            self.options.zoomLevel = map.getZoom();
            self.options.map = map;
            map.locate({setView: true});
            $scope.userMarker = self.locateUser({
                leafletEvent: {
                    latlng: {
                        lat: 45.954968795113395,
                        lng: 24.98291015625
                    }
                }
            }, $scope.map);
        });

        $scope.$on('leafletDirectiveMap.locationfound', function (event, args) {
            $scope.userMarker = self.locateUser(args, $scope.map);
            $rootScope.location = self.options.userLocation;

        });

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

        $scope.tasks = new Array();
        $scope.search = {
            location: '',
            category: ""
        };

        $scope.customer = {
            name: 'David',
            street: '1234 Anywhere St.'
        };

        taskFactory.getMongoStuff()
            .then(function(jobs) {
                $scope.tasks = jobs;
            }),
            function(error) {
                console.error(error);
            }
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
                .then(function(answer) {
                    $scope.temp = answer;
                });
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
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $http.get("/api/categories").success(function(response) {
            $scope.categories = response;
        });
        $http.get("api/states").success(function(response) {
            $scope.locations = response;
        });

        $scope.search = {};
        $scope.search.location = "";
        $scope.search.category = "";
        $scope.clearFilter = function() {
            $scope.search.location = "";
            $scope.search.category = "";
        };
        $scope.deleteJob = function(job) {
            Job.remove({
                id: job._id
            });
            $scope.tasks.splice($scope.tasks.indexOf(job), 1);
        }

    });
