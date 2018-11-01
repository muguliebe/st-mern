const express               = require('express');
const router                = express.Router();
const gravatar              = require('gravatar');
const bcrypt                = require('bcryptjs');
const jwt                   = require('jsonwebtoken');
const keys                  = require('../../config/keys');
const passport              = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput    = require('../../validation/login');

// load user model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Test post route
// @access  Public
router.get('/test', (req, res) => {
  res.json({msg: 'users Works'})
});

// @route   POST api/users/register
// @desc    User SignUp
// @access  Public
router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // validation
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // size
          r: 'pg',  // rating
          d: 'mm'   // default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {

  // validation
  const {errors, isValid} = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const inEmail    = req.body.email;
  const inPassword = req.body.password;

  // find user
  const user = await User.findOne({email: inEmail});
  if (!user) {
    errors.email = 'User not found';
    return res.status(404).json(errors);
  }

  // check password
  const bMatched = await bcrypt.compare(inPassword, user.password);
  if (bMatched) {
    const payload = {id: user.id, name: user.name, avatar: user.avatar};

    // sign
    try {
      const token = await jwt.sign(payload, keys.secretOrKey, {expiresIn: 360000});
      res.json({msg: 'Success', token: 'Bearer ' + token});
    } catch (err) {
      throw `jwt sign err occured: ${err.message}`;
    }

  } else {
    return res.status(400).json({password: 'Password incorrect'})
  }

});

// @route   GET api/users/current
// @desc    Return current user
// @access  Public
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});
module.exports = router;
