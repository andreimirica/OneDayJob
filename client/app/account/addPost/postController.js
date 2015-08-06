'use strict';


angular.module('oneDayJobApp')
    .controller('PostCtrl', function() {
        this.userState = '';
        this.states = ('Alba Arad Arges Bacau Bihor Bistrita Nasaud Botosani Braila Brasov Bucuresti Buzau Calarasi Caras-Severin Cluj Constanta Covasna Dambovita Dolj Galati Giurgiu Gorj Harghita Hunedoara Ialomita Iasi Ilfov Maramures Mehedinti Mures Neamt Olt Prahova Salaj Satu-Mare Sibiu Suceava Teleorman Timis Tulcea Valcea Vaslui Vrancea').split(' ').map(function(state) {
            return {
                abbrev: state
            };
        });
    });