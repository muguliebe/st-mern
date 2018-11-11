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

  // error handling
  router.use((err, req, res, next) => {
    console.trace(err)
    if (res.headerssent) {
      return next(err)
    }
    res.status(err.status || 500).send({error: err.message})
  })
}

const setDev = () => {

}

const setProd = () => {

}

const setGlobal = () => {
  global.wrapAsync = function (fn) {
    return function (req, res, next) {
      try {
        fn(req, res, next).catch(next)
      } catch (e) {
        if (e.name === 'TypeError') { }
      }
    }
  }
}

module.exports = {getEnvironment, setGlobal}
