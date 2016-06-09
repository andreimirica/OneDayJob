'use strict';

var _ = require('underscore');
var Job = require('./job.model');
var User = require('../user/user.model');
exports.searchTerm = function(req, res) {
    console.log('diwa');
    Job.find({
        title: {'$regex' : req.params.id, "$options": "i" }
    }, function(err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.status(404).send('Not Found');
        }
        return res.json(event);
    })
};

exports.index = function(req, res) {

    Job.find(function(err, jobs) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(jobs);
    });
};
exports.searchTerm = function(req, res) {    
       
       Job.find({ 'title': req.params.id}, function (err, event) {
           if(err) { return handleError(res, err); }
           if(!event) { return res.status(404).send('Not Found'); }
           return res.json(event);
         })
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
    Job.find({
        'owner': req.params.id
    }, function(err, job) {
        if (err) {
            return handleError(res, err);
        }
        if (!job) {
            return res.status(404).send('Not Found');
        }
        return res.json(job);
    })
};

exports.myUserApplied = function(req, res) {
    Job.find({
        'applicants': req.params.id
    }, function(err, job) {
        if (err) {
            return handleError(res, err);
        }
        if (!job) {
            return res.status(404).send('Not Found');
        }
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

exports.rateComments = function (req, res) {
    var userId = req.body._id;
    console.log(userId);
    User.findOne({_id: userId}).exec(function (err, user) {
        if (err) return validationError(res, err);
        var userRating = user.rating;
        if(userRating){
            var newRating = Math.round((userRating + req.body.rating) / 2);
            User.findOneAndUpdate({_id: userId}, {$set: {rating: newRating}}, {new: true}, function (err, wRes) {
                if(err){
                    res.status(500).send(err);
                }else{
                    res.status(200).json(wRes);
                }
            });
        } else {
            User.findOneAndUpdate({_id: userId}, {$set: {rating: req.body.rating}}, {new: true}, function (err, wRes) {
                if(err){
                    res.status(500).send(err);
                }else{
                    res.status(200).json(wRes);
                }
            });
        }
    })
};

exports.addComment = function(req, res, next) {
    var jobId = req.body._id;
    if(req.body.newComment){
        var newComment = {};
        newComment.text = req.body.newComment;
        newComment.owner = req.body.userName;
        newComment.photo = req.body.photo;
        newComment.phone = req.body.phone;
        newComment._id = req.body.userId;

        Job.findById(jobId, function(err, job) {

            job.comments.push(newComment);
            if (job.applicants.indexOf(req.body.email) < 0) {
                job.applicants.push(req.body.email);
            }
            job.save(function(err) {
                if (err) return validationError(res, err);
                res.status(200).send('OK');
            });

        });
    } else {
        Job.findById(jobId, function(err, job) {

            var comments = job.comments;
            var acceptedUsers = req.body.acceptedList;
            var newComments = [];
            _.each(acceptedUsers, function (acceptedUser) {
                _.each(comments, function (comment) {
                    var comm = {
                        text: comment.text,
                        owner: comment.owner,
                        photo: comment.photo,
                        phone: comment.phone,
                        _id: comment._id
                    };
                    console.log(comment);
                    console.log(acceptedUser);
                    if(comment._id == acceptedUser._id){
                        comm.isAccepted = true;
                    }
                    newComments.push(comm);
                })
            });
            console.log(newComments);
            Job.update({_id: jobId}, {$set: {comments: newComments, helpers: 0, closed: true}}, function (err, wRes) {
                if(err){
                    res.status(500).send(err);
                }else{
                    res.status(200).send('OK');
                }
            });

        });
    }
    
};

// Deletes a job from the DB.
exports.destroy = function(req, res) {
    Job.findById(req.params.id, function(err, job) {
        if (err) {
            return handleError(res, err);
        }
        if (!job) {
            return res.status(404).send('Not Found');
        }
        job.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
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
