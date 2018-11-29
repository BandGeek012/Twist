const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var Topics = require('../models/topics');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        topics_count: function(callback) {
            topics.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        topics_instance_count: function(callback) {
            topics.countDocuments({}, callback);
        },
        topics_instance_available_count: function(callback) {
            topics.countDocuments({status:'Available'}, callback);
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


// Display list of all Books.
exports.topics_list = function(req, res, next) {

    topics.find({}, 'title author')
      .populate('presenter')
      .exec(function (err, list_topics) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('topics_list', { title: 'Topics List', topics_list: list_topics });
      });
      
  };

  // Display detail page for a specific Topics.
  exports.topics_detail = function(req, res) {
      res.send('NOT IMPLEMENTED: Topics detail: ' + req.params.id);
  };
  
 // Display topics create form on GET.
exports.topics_create_get = function(req, res, next) { 
      
    // Get all Schools , which we can use for adding to our Topics.
    async.parallel({
        schools: function(callback) {
            School.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('topics_form', { title: 'Enroll', schools: results.schools, genres: results.genres });
    });
    
};
  
  // Handle Topics create on POST.
  exports.topics_create_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Topics create POST');
  };
  
  // Display Topics delete form on GET.
  exports.topics_delete_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Topics delete GET');
  };
  
  // Handle Topics delete on POST.
  exports.topics_delete_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Topics delete POST');
  };
  
  // Display Topics update form on GET.
  exports.topics_update_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Topics update GET');
  };
  
  // Handle Topics update on POST.
  exports.topics_update_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Topics update POST');
  };