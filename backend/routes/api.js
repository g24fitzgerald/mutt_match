var express = require('express');
var router = express.Router();

var UserPreference = require('../models/user_preference');
var Dog = require('../models/dog');
// var UserDogMatch = require('../models/user_dog_match');

//get all playlists for a user
router.get('/dogs', function(req, res, next) {
  //auth0's way of handling user
  // var userId = req.user.aud;
  // Find ALL documents that match the criteria passed, only return the "name" and "favorite" fields

  Dog.find({ userId: req.user.aud }, '', function(err, result) {
    if (err) console.log(err);
    console.log(result);

    res.json(result);
  });
});
module.exports = router;
