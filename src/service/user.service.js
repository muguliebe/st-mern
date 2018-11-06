const {isEmpty} = require('../validation')
const gravatar  = require('gravatar')
const User      = require('../models/User')

const getUser = async (email) => {
  if (isEmpty(email)) {
    throw new Errors('email is required')
  }

  return User.findOne({email: email})
    .then(user => user)
    .catch(e => null)
}

const getUserOrCreate = async (email) => {

  if (isEmpty(email)) {
    throw new Errors('email is required')
  }

  // select user then return exist user
  const existUser = await getUser(email)
  console.log(existUser)
  if (existUser) return existUser

  // create user
  const name    = email.split('@').shift()
  const gravatar = await getGravatar(email)
  const newUser = new User({
    name: name,
    email: email,
    avatar: gravatar,
    password: '1111'
  })

  return await newUser.save()
}

const getGravatar = async (email) => {
  return await gravatar.url(email, {
    s: '200', // size
    r: 'pg',  // rating
    d: 'mm'   // default
  })
}

module.exports = {getUser, getUserOrCreate}
