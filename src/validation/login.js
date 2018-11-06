const {required} = require('./')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let errors = required(data, ['email', 'password'])

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
