const router      = require('express').Router()
const bodyParser = require('body-parser')
const cors       = require('cors')
const {allAround} = require('../service/advice')

function commonMiddleWare() {
  router.use(cors())
  router.use(bodyParser.urlencoded({extended: false}))
  router.use(bodyParser.json())
  router.use(allAround())
  return router
}

module.exports = commonMiddleWare
