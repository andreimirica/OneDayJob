'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var JobSchema = new Schema({
    	"Title": String,
    	"Description": String,
    	"Location" : String,
    	"StartDate" : Date,
    	"EndDate" : Date,
    	"PayRange" : String,
    	"NumberOfHelpers" : String,
    	"PostStartDate" : Date,
    	"PostEndDate" : Date,
    	"Owner":String,
    	"Category":String
    });

module.exports = mongoose.model('Job', JobSchema);