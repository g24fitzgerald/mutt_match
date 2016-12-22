var express = require('express');
var router = express.Router();
var Preference = require('../models/user_preference');
var Dog = require('../models/dog');
/* COPIED FROM CHECKPREFS REDO. */
router.post('/profile', function(req, res, next) {
  if (err) console.log('findmatch did not work');
  var dog_matches = [];
  if (result) {
    console.log(result);
    Dog.find(
      {  //find dogs with characteristics that match preference
      active: req.body.active,
      lazy: req.body.lazy,
      hypoallergenic: req.body.dog_allergy,
      good_with_kids: req.body.has_kids,
      good_with_dogs: req.body.has_dogs,
      good_with_cats: req.body.has_cats
     }, '', function(err, result) {
       console.log('finding matches');
       dog_matches += result;

      res.json(dog_matches);
      }
    }
    else {
      console.log('else hit in findmatch');
      res.send(false);
    }
  });
});

module.exports = router;
