const Validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  Object.keys(data)
    .map(key => {
      data[key] = !isEmpty(data[key]) ? data[key] : '';
      return key
    })
    .filter(key => key.match("email|password"))
    .filter(key => Validator.isEmpty(data[key]))
    .forEach(key => errors[key] = key + ' field is required');

  return {
    errors,
    isValid: isEmpty(errors)
  }

};
