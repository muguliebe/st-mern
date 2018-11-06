const express = require('express')
const router = express.Router()
const passport = require('passport')
const Profile = require('../../models/Profile')

// load validation
const validateProfileInput = require('../../validation/profile')

function init(router) {
  const url = '/api/profile'
  const passportAuth = passport.authenticate('jwt', {session: false})


  router.get(url.concat('/test'), test)
  router.get(url, passportAuth, getProfile)
  router.post(url, postProfile)
  router.get(url.concat('/all'), getProfiles)

  return router
}

const test = (req, res) => {
  res.json({msg: 'profile works'})
}

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
const postProfile = async (req, res) => {
  try {
    const {errors, isValid} = validateProfileInput(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    // Get fields
    const profileFields = {}
    profileFields.user = req.user.id;
    ['handle', 'company', 'website', 'location', 'bio', 'status', 'githubusername']
      .filter(key => req.body[key])
      .forEach(key => profileFields[key] = req.body[key])

    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',')
    }

    // Social
    profileFields.social = {};
    ['youtube', 'twittter', 'facebook', 'linkedin', 'instagram']
      .filter(key => req.body[key])
      .forEach(key => profileFields.social[key] = req.body[key])

    const profile = await Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar'])
    if (profile) {
      const profile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields},
        {new: true}
      )
      res.json(profile)
    } else {
      // Check if handle exists
      const profile = await Profile.findOne({handle: profileFields.handle})
      if (profile) {
        errors.handle = 'That handle already exists'
        return res.status(400).json(errors)
      }

      // Save Profile
      const profileSaved = await
        new Profile(profileFields).save()
      res.json(profileSaved)
    }
  } catch (e) {
    return res.status(500).json(`internal error occurred: ${e.message}`)
  }
}

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
const getProfile = async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar'])

    if (!profile) {
      errors.noprofile = 'There is no profile for this user'
      return res.status(404).json(errors)
    }
    res.json(profile)
  } catch (e) {
    res.status(404).json(e)
  }
}

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
const getProfiles = async (req, res) => {
  const errors = {}
  try {
    const profiles = await Profile.find()
      .populate('user', ['name', 'avatar'])
    if (!profiles) {
      errors.noprofile = 'There are no profiles'
      return res.status(404).json(errors)
    }
    res.json(profiles)
  } catch (e) {
    res.status(404).json({profile: 'There are no profiles'})
  }
}

module.exports = init(router)
