const express     = require('express')
const router      = express.Router()
const gravatar    = require('gravatar')
const valid       = require('../../utils/validation')
const serviceAuth = require('../../service/auth-service')

// load user model
const User = require('../../models/user-model')

function init(router) {

  const url = '/api/users'
  const authRequired = serviceAuth.requireLogin

  router.post(url.concat('/register'), register)
  router.post(url.concat('/login'), login)
  router.get(url.concat('/current'), authRequired, getCurrentUser)

  return router
}

// @route   POST api/users/register
// @desc    User SignUp
// @access  Public
const register = (req, res) => {

  const {isValid, errors} = valid.requiredKeys(req.body, ['email', 'name'])
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // validation
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(403).json(errors)
      }

      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg',  // rating
        d: 'mm'   // default
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      })

      newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
    })
}

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
const login = async (req, res) => {

  // validation
  const {isValid, errors} = valid.requiredKeys(req.body, ['email', 'password'])
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // declaration
  const inEmail    = req.body.email
  const inPassword = req.body.password

  // find user
  const user = await User.findOne({email: inEmail})
  if (!user) {
    errors.email = 'User not found'
    return res.status(404).json(errors)
  }

  // check password
  const bMatched = User.matchedPassword(inPassword, user.password)
  if (!bMatched) {
    return res.status(400).json({password: 'Password incorrect'})
  } else {

    // sign
    try {
      const token = serviceAuth.generateJWT(user)
      res.json({msg: 'Success', token: token})
    } catch (err) {
      throw `jwt sign err occurred: ${err.message}`
    }
  }
}

// @route   GET api/users/current
// @desc    Return current user
// @access  Public
const getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
}

module.exports = init(router)
