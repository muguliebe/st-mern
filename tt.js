const db   = require('./src/config/db')
const User = require('./src/models/user-model')

db.connect()

const testOne = async () => {
  console.log('a')
  const users = await User.find({name: 'zan'})
  console.log(users.length)
  if (users.length > 0) {
    users.map(user => console.log('user = ' + user.email))
  } else {
    console.log('there is no user')
  }

  User.find({name: 'a'}, (err, users) => {
    if(err){
      console.log('there is no user')
    }
    console.log('users = ' + users)
    users.map(user => console.log('user = ' + user))
  })

  User.find({name:'a'})
    .then(users => console.log('2users = ' + users))
    .catch(err => err.log())
}

testOne()


const testTwo = () => {
  User.find({name: 'zany'})
    .then(users => users.map(user => console.log(user.email)))
    .catch(err => console.log('err:', err))
}
// testTwo()


