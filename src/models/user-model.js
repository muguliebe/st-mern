const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  avatar: {type: String},
  date: {type: Date, default: Date.now}
}, {timestamps: true})

UserSchema.statics.matchedPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

UserSchema.pre('save', function(next) {
  const unsafePassword = this.password
  console.log('this.password = ' + this.password)
  bcrypt.hash(unsafePassword, 10, (err, hash) => {
    if (err) throw err
    this.password = hash
    next()
  })
})

module.exports = User = mongoose.model('users', UserSchema)
