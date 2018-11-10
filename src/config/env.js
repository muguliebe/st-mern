const router      = require('express').Router()
const bodyParser  = require('body-parser')
const {allAround} = require('../service/advice')
const passport    = require('passport')

const getEnvironment = () => {
  setCommon()
  if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
    setDev()
  } else {
    setProd()
  }
  return router
}

const setCommon = () => {
  router.use(bodyParser.urlencoded({extended: false}))
  router.use(bodyParser.json())
  router.use(passport.initialize())
  require('./passport')(passport)

  // use filter
  router.use(allAround())
}

const setDev = () => {

}

const setProd = () => {

}

module.exports = getEnvironment
