const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const { alert } = require('../modules/util');

/*
// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', function (req, res, next) {
  console.log(User.find());
  res.render('index.pug');
});

router.get('/sample', function (req, res, next) {
  const user = new User({
    name: 'rafahel',
    age: 42
  });

  // promise: then-catch
  user.save().then(result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

router.post('/user/save', async function (req, res, next) {
  const { name, age } = req.body;
  const user = new User({ name, age });
  const oldUser = await User.find({ name });
  console.log(oldUser);
  if (oldUser.length) {
    res.send(alert("already exist", "/"));
  }
  else {
    // promise: async-await
    try {
      const result = await user.save();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
});

module.exports = router;