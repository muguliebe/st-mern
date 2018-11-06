const Validator = require('validator')

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

// @param data
// @param fields ex) ['field1', 'field2', 'field3']
export const required = (data, fields) => {
  const errors = {}

  fields.map(key => {
      data[key] = !isEmpty(data[key]) ? data[key] : ''
      return key
    })
    .filter(key => Validator.isEmpty(data[key]))
    .forEach(key => errors[key] = key + ' field is required')

  return errors
}
