const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

// router
const users   = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts   = require('./routes/api/posts');

// initialization
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// filter
app.use((req, res, next) => {
  const startDate = new Date();
  const end       = res.end;

  res.end = function(){
    end.apply(res, arguments);
    const elapsed = new Date() - startDate;
    console.log(`${req.method} ${req.url} [${elapsed} ms]`);
  };

  next()
});

// DB config
const db = require('../config/keys').mongoURI;

// connect to mongodb
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('mongo DB Connected'))
  .catch(err => console.log(err))
;

// controller
app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// error handling
app.use((err, req, res, next) => {
  res.status(500).send({error: err.message});
  next()
});

// server start
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
