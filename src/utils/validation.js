const isEmpty = (value) => {
  return !value || !value.trim()
}

// @param data
// @param fields ex) ['field1', 'field2', 'field3']
const requiredKeys = (data = {}, fields) => {
  const result = {
    isValid: true,
    errors: {}
  }

  fields
    .filter(key => isEmpty(data[key]))
    .forEach(key => {
      result.isValid     = false
      result.errors[key] = key + ' field is required'
    })

  return result
}

module.exports = {
  isEmpty,
  requiredKeys
}
