const mongoose = require('mongoose')

const db = require('./keys').mongoURI

const dbConnect = () => {
  mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('mongo DB Connected'))
    .catch(err => console.log(err))
}

module.exports = dbConnect
