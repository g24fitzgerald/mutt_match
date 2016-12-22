var express = require('express');
var router = express.Router();
var Preference = require('../models/user_preference');
var Dog = require('../models/dog');
/* COPIED FROM CHECKPREFS REDO. */
router.post('/profile', function(req, res, next) {
  var dog_matches = [];
  Dog.find({/* preference? */  }, '', function(err, result) {
    if (err) console.log(err);
    console.log('running..');
    if (result) {
      // console.log(result);
      
      res.json(dog_matches);
    }
    else {
      console.log('else hit in findmatch');
      res.send(false);
    }
  });
});

module.exports = router;
