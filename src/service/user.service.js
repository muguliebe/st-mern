const {isEmpty}  = require('../validation')
const {required} = require('../validation')
const gravatar   = require('gravatar')
const User       = require('../models/User')

export const getUser = async (email) => {
  let errors = required(req.body, email)
  if (errors) return errors

  return await User.findOne({email: id})
}

export const getUserOrCreate = async (email) => {

  if (isEmpty(email)) {
    throw new Errors('email is required')
  }

  // select user then return exist user
  const existUser = getUser(email)
  if (existUser) return existUser

  // create user
  const name    = email.split('@').shift()
  const newUser = new User({
    name: name,
    email: email,
    avatar: getGravatar(email),
    password: ''
  })

  return await newUser.save()
}

const getGravatar = (email) => {
  return gravatar.url(email, {
    s: '200', // size
    r: 'pg',  // rating
    d: 'mm'   // default
  })
}
