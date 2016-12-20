var express = require('express');
var router = express.Router();
var UserPreference = require('../models/user_preference');

router.get('/profile', function(req, res, next) {

  Preference.find({ userId: req.user.aud }, '', function(err, result) {
    if (err) console.log(err);
    else if (result) {
      console.log(userId);
      console.log(result);
      res.json(result);
    }
    else {res.send('false');}
  });
});
module.exports = router;
