var express = require('express');
var router = express.Router();

var UserPreference = require('../models/user_preference');
var Dog = require('../models/dog');
// var UserDogMatch = require('../models/user_dog_match');

//get all playlists for a user
router.get('/user_preference', function(req, res, next) {
  //auth0's way of handling user
  // var userId = req.user.aud;
  // Find ALL documents that match the criteria passed, only return the "name" and "favorite" fields

  Playlist.find({ userId: req.user.aud }, '', function(err, preference) {
    if (err) console.log(err);
    console.log(preference);

    res.json(preference);
  });
});
