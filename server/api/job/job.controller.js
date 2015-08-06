'use strict';

var _ = require('lodash');
var Job = require('./job.model');

exports.index = function(req, res) {
  if(req.query.searchTerm){



       Job.find({ 'title': req.params.searchTerm }, function(err, event) {
           if(err) { return handleError(res, err); }
           if(!event) { return res.status(404).send('Not Found'); }
           return res.json(event);
         });
  }
else {
    Job.find(function(err, jobs) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(jobs);
    });
}

  
};

// Get a single job
exports.show = function(req, res) {
    Job.findById(req.params.id, function(err, job) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(job);
    });
};


exports.myUserJob = function(req, res) {     
       Job.find({ 'owner': req.params.id }, function (err, job) {
           if(err) { return handleError(res, err); }
           if(!job) { return res.status(404).send('Not Found'); }
           return res.json(job);
         })
   };

exports.myUserApplied = function(req, res) {     
       Job.find({ 'applicants': req.params.id }, function (err, job) {
           if(err) { return handleError(res, err); }
           if(!job) { return res.status(404).send('Not Found'); }
           return res.json(job);
         })
   };

exports.create = function(req, res) {
    Job.create(req.body, function(err, job) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(job);
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}