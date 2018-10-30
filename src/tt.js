const Validator = require('validator');

data = {
  name: 'a',
  email: 'b',
  password: ''
  // password2: ''
};

Object.keys(data)
  .filter(key => key.match("name|email|password"))
  .filter(key => Validator.isEmpty(data[key]))
  .forEach(key => console.log(key))
;
