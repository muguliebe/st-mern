const express = require('express')
const router  = express.Router()

function init(router) {
  const url = '/api'
  router.get(url, root)
  return router
}

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
const root = (req, res) => {
  res.json({message: 'alive'})
}

module.exports = init(router)
