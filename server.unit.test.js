const {describe} = require('mocha')
const assert     = require('assert')
const axios      = require('axios')

const port = process.env.PORT || 3001
describe('server', () => {
  before(function (done) {
    require('./server')
    setTimeout(function () {
      done()
    }, 1000)
  })
  it('it must be return alive', async () => {
    const res = await axios.get(`http://localhost:${port}/api`)
    assert.equal(res.data.message, 'alive')
  })
})
