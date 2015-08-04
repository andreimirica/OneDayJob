'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StateSchema = new Schema({
    stateName : String
});

module.exports = mongoose.model('State', StateSchema);