const db     = require('./src/config/db')
const Task   = require('./src/models/task-model')
const moment = require('moment')

db.connect();

// (() => {
//   Task.find({title:'bad'})
//     .then(tasks => console.log('tasks = ' + tasks.length))
//     .catch(() => console.log('no'))
// })();

// (async () => {
//   const tasks = await Task.findOne({title: 'bad'})
//   if (!tasks || tasks.length === 0) {
//     console.log('no')
//   } else {
//     console.log('tasks = ' + tasks.length)
//   }
// })();

(async () => {
  const id = '5be766b160d033fb43951fd1'
   const result = await Task.findByIdAndDelete({_id: id})
  console.log(result)
})();

