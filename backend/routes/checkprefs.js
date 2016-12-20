var express = require('express');
var router = express.Router();
var Preference = require('../models/user_preference');
var Dog = require('../models/dog');

router.post('/checkprefs', function(req, res, next) {
  Preference.find({ userId: req.body.userid }, '', function(err, result) {
    if (err) console.log(err);
    console.log('running..');
    if (result.length) {
      // console.log(result);
      res.json(result);
    }
    else {
      console.log('else hit');
      res.send(false);
    }
  });
});
module.exports = router;
