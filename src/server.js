const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const passport   = require('passport');

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

  res.end = function () {
    end.apply(res, arguments);
    const elapsed = new Date() - startDate;
    console.log(`${req.method} ${req.originalUrl} [${elapsed} ms]`);
  };

  next()
});

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongodb
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('mongo DB Connected'))
  .catch(err => console.log(err))
;

// passport config
app.use(passport.initialize());
require('./config/passport')(passport);

// controller
app.get('/', (req, res) => res.send(`alive`));
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// error handling
app.use((err, req, res, next) => {
  if(res.headersSent){
    return next(err)
  }
  res.status(500).send({error: err.message});
});

// server start
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
