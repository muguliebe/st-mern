const express      = require('express')
const mongoose     = require('mongoose')
const bodyParser   = require('body-parser')
const passport     = require('passport')
const path         = require('path')
const readReadSync = require('recursive-readdir-sync')

// router & service
const {allAround} = require('./src/service/advice')

// initialization
const app    = express()
const router = express.Router()
app.use(router)
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

// filter
router.use(allAround())

// DB config
const db = require('./src/config/keys').mongoURI
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('mongo DB Connected'))
  .catch(err => console.log(err))

// controller
const routeBind = function () {
  try {
    const controllers = path.join(__dirname, './src/routes/')
    console.log(`controller(routes) bind start at ${controllers}`)
    readReadSync(controllers)
      .filter(file => file.split('.').pop() === 'js')
      .forEach(file => {
        try {
          console.log(`route bind: ${file}`)
          router.use(require(file));
        } catch (err) {
          console.log(`mount controller err occurred at ${file}\n\t ${err}`)
          throw new Error(`${file}:${err}`)
        }
      })
  } catch (err) {
    console.log(`err occurred: ${err}`)
  }
}()

// passport config
app.use(passport.initialize())
require('./src/config/passport')(passport)

// client file serving
if (process.env.NODE_ENV === 'production') {
// Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// error handling
app.use((err, req, res, next) => {
  console.error(err.message)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send({error: err.message})
})

// server start
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
