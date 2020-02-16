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

// https://mongoosejs.com/docs/api/query.html
router.get('/', async function (req, res, next) {
  // console.log(User.find());
  const result = await User.find();
  res.render('index.pug', { result });
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

  // update
  // const result = await User.update({ _id: req.params.id }, { age: 25 });

  console.log(oldUser);
  if (oldUser.length) {
    res.send(alert("already exist", "/"));
  }
  else {
    // promise: async-await
    try {
      const result = await user.save();
      // res.json(result);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
});

router.get('/user/delete/:id', async function (req, res, next) {
  const result = await User.remove({ _id: req.params.id });
  res.json(result);
  if (result.ok === 1) res.redirect('/');
  else res.send(alert('fail to delete', '/'));
});

module.exports = router;