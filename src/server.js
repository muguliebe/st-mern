const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB config
const db = require('../config/keys').mongoURI;

// connect to mongodb
mongoose.connect(db)
  .then(() => console.log('mongo DB Connected'))
  .catch(err => console.log(err))
;

// controller
app.get('/', (req, res) => res.send('Hello World'));

// server start
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
