const routes       = require('express').Router()
const path         = require('path')
const readReadSync = require('recursive-readdir-sync')

const routerBind = () => {
  try {
    const controllers = path.join(__dirname, './')
    console.log(`controller(routes) bind start at ${controllers}`)
    readReadSync(controllers)
      .filter(file => file.split('/').pop() !== 'index.js')
      .filter(file => file.split('.').pop() === 'js')
      .forEach(file => {
        try {
          console.log(`route bind: ${file}`)
          routes.use(require(file))
        } catch (err) {
          console.log(`mount controller err occurred at ${file}: ${err.message}`)
          console.log(err)
          throw new Error(`${file}:`, err)
        }
      })
    return routes
  } catch (err) {
    console.log(`err occurred: ${err}`)
  }
}

module.exports = routerBind
