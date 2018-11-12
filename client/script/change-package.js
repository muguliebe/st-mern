const fs = require('fs')

fs.readFile('../package.json', 'utf8', function (err, data) {
  if (err) return console.log(`Error with configure script: ${err}`)

  // parse current package.json into an object
  let parsedData = JSON.parse(data)

  // get the proxy from the environment variable
  let proxy = process.env.REACT_APP_PROXY || 'http://localhost.com'
  proxy += ':'
  proxy += process.env.PORT || '3001'

  parsedData.proxy = proxy

  // for package.json formatting
  const spacing  = 2
  let dataString = JSON.stringify(parsedData, null, spacing)

  // overwrite the current package.json
  fs.writeFile('../package.json', dataString, err => {
    if (err) console.error(`Error writing file: ${err}`)
  })
})
