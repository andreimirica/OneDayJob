'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
    title: String,
    description: String,
    owner: String,
    location: String,
    category: String,
    helpers: Number,
    closed: Boolean,
    paycheck: Number,
    jobDate: Date,
    accepted: [],
    applicants: [],
    comments: [],
    createdAt: Date
});

module.exports = mongoose.model('Job', JobSchema);