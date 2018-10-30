const Validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name      = !isEmpty(data.name) ? data.name : '';
  data.email     = !isEmpty(data.email) ? data.email : '';
  data.password  = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  Object.keys(data)
    .map(key => {
      data[key] = !isEmpty(data[key]) ? data[key] : '';
      return key
    })
    .filter(key => key.match("name|email|password|password2"))
    .filter(key => Validator.isEmpty(data[key]))
    .forEach(key => errors[key] = key + ' field is required');

  if (!Validator.isLength(data.name, {min: 2, max: 30})) {
    errors.password = 'Name must be between 2 and 30 characters';
  }
  if (!Validator.isLength(data.password, {min: 6, max: 60})) {
    errors.password = 'Password must be between 6 and 60 characters';
  }
  if (Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

};
