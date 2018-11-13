const router      = require('express').Router()

const getEnvironment = () => {
  setCommon()
  if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
    setDev()
  } else {
    setProd()
  }
  return router
}

const setCommon = () => { }
const setDev = () => { }
const setProd = () => { }

module.exports = {getEnvironment}
