const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: String,
  body: String,
  dueDate: {type: Date, default: Date.now},
  completed: {type: Boolean, default: false},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
}, {'timestamps': true})

module.exports = Task = mongoose.model('task', taskSchema)
