const express    = require('express')
const routerBind = require('./src/routes/')
const env        = require('./src/config/env')
const db         = require('./src/config/db')


const app = express()
app.use(env.getEnvironment())  // initialization
db.connect()                 // DB config
app.use(routerBind())       // controller

// client file serving
if (process.env.node_env === 'production') {
  app.use(express.static('client/build')) // set static folder
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// error handling
app.use((err, req, res, next) => {
  console.error(err.message)
  if (res.headerssent) {
    return next(err)
  }
  res.status(500).send({error: err.message})
})

// server start
const port = process.env.port || 3001
app.listen(port, () => console.log(`server running on port ${port}`))
