const {describe} = require('mocha')
const assert     = require('assert')
const validation = require('./validation')

describe('validation', () => {
  it('isEmpty must be true', function () {
    const result = validation.isEmpty('')
    assert.equal(result, true)
  })
  it('isEmpty must be false', () => {
    const result = validation.isEmpty('a')
    assert.equal(result, false)
  })
  it('requiredKeys return isValid:true', () => {
    const data = {
      a: 'a',
      b: 'b'
    }
    const {isValid} = validation.requiredKeys(data, ['a', 'b'])
    assert.equal(isValid, true)
  })
})
