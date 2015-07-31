'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
  title : String,
  description : String,
  owner : String,
  location : String,
  category : String,
  manpower: String,
  minpaycheck: String,
  maxpaycheck: String,
  startDate : Date,
  endDate : Date,
  PostStartDate : Date,
  PostEndDate : Date, 
});

module.exports = mongoose.model('Job', JobSchema);