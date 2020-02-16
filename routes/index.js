const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

/*
// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', function (req, res, next) {
  console.log(User.find());
  res.send('hello mongoose');
});

router.get('/sample', function (req, res, next) {
  const user = new User({
    name: '송명호',
    age: 45
  });

  // promise
  user.save().then(result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

module.exports = router;
