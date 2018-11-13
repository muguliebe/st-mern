const assert                                  = require('assert')
const superagent                              = require('superagent')
const {Then, When, Given}                     = require('cucumber')
const {convertStringToArray, getValidPayload} = require('./util')
const objectPath                              = require('object-path')

When(/^the client creates a (GET|POST|PATCH|PUT|DELETE|OPTIONS|HEAD) request to ([\/\w-]+)$/, function (method, path) {
  const protocol = process.env.SERVER_PROTOCOL
  const host     = process.env.SERVER_HOST
  const port     = process.env.SERVER_PORT
  this.request   = superagent(method, `${protocol}://${host}:${port}${path}`)
})

When(/^attaches a (.+) payload which is missing the (.*) fields?$/, function (payloadType, missingFields) {
  this.requestPayload  = getValidPayload(payloadType)
  const fieldsToDelete = convertStringToArray(missingFields)
  fieldsToDelete.forEach(field => delete this.requestPayload[field])
  this.request
    .send(JSON.stringify(this.requestPayload))
    .set('Content-Type', 'application/json')
})

Given(/^attaches an? (.+) payload where the ([a-zA-Z0-9\., ]+) fields? (?:is|are)(\s+not)? a ([a-zA-Z]+)$/,
  function (payloadType, fields, invert, type) {
    this.requestPayload  = getValidPayload(payloadType)
    const typeKey        = type.toLowerCase()
    const invertKey      = invert ? 'not' : 'is'
    const sampleValues   = {
      object: {
        is: {},
        not: 'string'
      },
      string: {
        is: 'string',
        not: 10
      }
    }
    const fieldsToModify = convertStringToArray(fields)
    fieldsToModify.forEach(field => {
      objectPath.set(this.requestPayload, field, sampleValues[typeKey][invertKey])
    })
    this.request
      .send(JSON.stringify(this.requestPayload))
      .set('Content-Type', 'application/json')
  })

When(/^sends the request$/, function (callback) {
  this.request.then((response) => {
    this.response = response.res
    callback()
  }).catch((errResponse) => {
    this.response = errResponse.response
    callback()
  })
})
When(/^attaches a generic (.+) payload$/, function (payloadType) {
  switch (payloadType) {
    case 'malformed':
      this.request.send('{"email": "test@test.com", name: }').set('Content-Type', 'application/json')
      return
    case 'non-JSON':
      this.request.send('<?xml version="1.0" encoding="UTF-8" ?><email>test@test.com</email>').set('Content-Type', 'text/xml')
      return
    case 'empty':
    default:
      return
  }
})

Then(/^our API should respond with a ([1-5]\d{2}) HTTP status code$/, function (statusCode) {
  assert.equal(this.response.statusCode, statusCode)
})

Then(/^the payload of the response should be an? ([a-zA-Z0-9, ]+)$/, function (payloadType) {
  const contentType = this.response.headers['Content-Type'] || this.response.headers['content-type']
  if (payloadType === 'JSON object') {
    // Check Content-Type header
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response not of Content-Type application/json')
    }

    // Check it is valid JSON
    try {
      this.responsePayload = JSON.parse(this.response.text)
    } catch (e) {
      throw new Error('Response not a valid JSON object')
    }
  } else if (payloadType === 'string') {
    // Check Content-Type header
    if (!contentType || !contentType.includes('text/plain')) {
      throw new Error('Response not of Content-Type text/plain')
    }

    // Check it is a string
    this.responsePayload = this.response.text
    if (typeof this.responsePayload !== 'string') {
      throw new Error('Response not a string')
    }
  }
})

Then(/^contains a (.*) property which says (?:"|')(.*)(?:"|')$/, function (key, message) {
  assert.equal(this.responsePayload[key], message)
})

