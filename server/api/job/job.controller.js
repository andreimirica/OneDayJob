'use strict';

var _ = require('lodash');
var Job = require('./job.model');

exports.index = function(req, res) {
    Job.find(function(err, jobs) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(jobs);
    });
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
};

exports.addComment = function(req, res, next) {
    var jobId = req.body._id;
    var newComment={};
    newComment.text = req.body.newComment;
    newComment.owner=req.body.userName;



    Job.findById(jobId, function(err, job) {

        job.comments.push(newComment)
        if(job.applicants.indexOf(req.body.userId)<0)
        {
            job.applicants.push(req.body.userId);
        }
        job.save(function(err) {
            if (err) return validationError(res, err);
            res.status(200).send('OK');
        });
        
    });



};
exports.confirmApplicants= function(req,res,next){
  var accepted=req.body.acceptedList;
  console.log(accepted);
  var jobId = req.body._id;
  console.log(accepted);
    Job.findById(jobId, function(err, job){
       job.accepted.push(accepted); 
       job.applicants.splice(accepted);
       
       job.save(function(err) {
            if (err) return validationError(res, err);
            res.status(200).send('OK');
        });
    });
}
