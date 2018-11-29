const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var Participant = require('../models/participant');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        participant_count: function(callback) {
            participant.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        participant_instance_count: function(callback) {
            participant.countDocuments({}, callback);
        },
        participant_instance_available_count: function(callback) {
            participant.countDocuments({status:'Available'}, callback);
        },
        school_count: function(callback) {
            School.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};


// Display list of all Participants.
exports.participant_list = function(req, res, next) {

    Participant.find({}, 'ParticipantID LastName FirstName')
      .populate('ParticipantID')
      .exec(function (err, list_participants) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('participant_list', { title: 'Participant List', participant_list: list_participants });
      });
      
  };

  // Display detail page for a specific Participant.
  exports.participant_detail = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant detail: ' + req.params.id);
  };
  
 // Display participant create form on GET.
exports.participant_create_get = function(req, res, next) { 
      
    // Get all Schools , which we can use for adding to our Participant.
    async.parallel({
        schools: function(callback) {
            School.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('participant_form', { title: 'Enroll', schools: results.schools, genres: results.genres });
    });
    
};
  
  // Handle Participant create on POST.
  exports.participant_create_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant create POST');
  };
  
  // Display Participant delete form on GET.
  exports.participant_delete_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant delete GET');
  };
  
  // Handle Participant delete on POST.
  exports.participant_delete_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant delete POST');
  };
  
  // Display Participant update form on GET.
  exports.participant_update_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant update GET');
  };
  
  // Handle Participant update on POST.
  exports.participant_update_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant update POST');
  };