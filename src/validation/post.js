const Validator = require('validator')
const {isEmpty, required} = require('./')

module.exports = function validatePostInput(data) {
  const errors = required(data, ['text'])

  if (!Validator.isLength(data.text, {min: 10, max: 300})) {
    errors.text = 'post text must be between 10 and 300 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
