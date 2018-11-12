const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname, '../', 'package.json')
fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.log(`Error with configure script: ${err}`)

  // parse current package.json into an object
  let parsedData = JSON.parse(data)

  // get the proxy from the environment variable
  let proxy = process.env.REACT_APP_PROXY || 'http://localhost'
  proxy += ':'
  proxy += process.env.PORT || '3001'
  console.log(`process.env.PORT=${process.env.PORT}`)
  console.log(`bf proxy:${parsedData.proxy}`)
  console.log(`af proxy:${proxy}`)

  parsedData.proxy = proxy

  // for package.json formatting
  const spacing  = 2
  let dataString = JSON.stringify(parsedData, null, spacing)

  // overwrite the current package.json
  fs.writeFile(file, dataString, err => {
    if (err) console.error(`Error writing file: ${err}`)
  })
})
