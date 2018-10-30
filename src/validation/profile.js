const Validator = require('validator');
const {isEmpty, required} = require('./');

module.exports = function validateProfileInput(data) {
  let errors = {};

  required(data, ['handle', 'status', 'skills']);

  if (!Validator.isLength(data.handle, {min: 2, max: 40})) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  ['website', 'youtube', 'twitter', 'facebook', 'linkedin', 'instagram']
    .filter(key => !isEmpty(data[key]))
    .filter(key => !Validator.isURL(data[key]))
    .forEach(key => errors[key] = 'Not a valid URL');

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
