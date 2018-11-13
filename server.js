const express          = require('express')
const routerBind       = require('./src/routes/')
const db               = require('./src/config/db')
const commonMiddleware = require('./src/middleware/common-middleware')

const app = express()
app.use(commonMiddleware())
db.connect()                 // DB config
app.use(routerBind())        // controller

// client file serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build')) // set static folder
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// server start
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server running on port ${port} on ${process.env.NODE_ENV}`))
