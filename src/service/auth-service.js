const jwt  = require('jsonwebtoken')
const keys = require('../config/keys')

const generateJWT  = (user) => {
  const tokenData = {
    id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    role: user.role || 'normal'
  }
  return jwt.sign(tokenData, keys.secretOrKey, {expiresIn: 3600})

}
const requireLogin = (req, res, next) => {
  const token = req.headers.authorization || req.headers['authorization']
  const user  = decodeToken(token)
  if (!user) {
    return res.status(401).json({message: 'You must be logged in.'})
  }
  req.user = user
  next()
}

const decodeToken = (token) => {
  if (!token) {
    return null
  }

  try {
    return jwt.verify(token, keys.secretOrKey)
  } catch (error) {
    return null
  }
}

const getUsername = (req) => {
  const user = decodeToken(req)
  if (!user) {
    return null
  }
  return user.username
}

const getUserId = (req) => {
  const token = decodeToken(req)
  if (!token) {
    return null
  }
  return token.user.id
}

module.exports = {generateJWT, requireLogin, decodeToken, getUsername, getUserId}
