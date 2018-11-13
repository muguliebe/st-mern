const {required, isEmpty} = require('../validation/index')
const router              = require('express').Router()
const Task                = require('../models/task-model')

function init(router) {
  const url = '/api/tasks'

  router.post(url, postTask)
  router.get(url, getTasks)
  router.get(url + '/:id', getTask)
  router.put(url + '/:id', putTask)
  router.delete(url + '/:id', deleteTask)

  return router
}

const postTask = (req, res) => {
  const error = required(req.body, ['title', 'body'])
  if (!isEmpty(error)) {
    return res.status(400).json(error)
  }

  const task = new Task(req.body)
  task.save(err => {
    if (err) {
      console.log(err)
      return res.status(500).json()
    }
    res.status(201).json(task)
  })
}

const getTasks = async (req, res) => {
  const tasks = await Task.find()
  if (!tasks || tasks.length === 0) {
    return res.status(404).json({errors: 'there is no task'})
  }
  res.json(tasks)
}

const getTask = async (req, res) => {
  const task = await Task.findOne({_id: req.params.id})
  if (!task) {
    return res.status(404).json({errors: 'there is no task'})
  }
  res.json(task)
}

const putTask = async (req, res) => {
  console.log(req.body)
  const error = required(req.body, ['title', 'body'])
  if (!isEmpty(error)) {
    return res.status(400).json(error)
  }

  const task        = new Task(req.body)
  const updatedTask = await Task.findByIdAndUpdate({_id: req.params.id}, task)
  if (!updatedTask) {
    return res.status(500).json({errors: 'there is no task'})
  }
  res.json(updatedTask)
}

const deleteTask = async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete({_id: req.params.id})
  if (!deletedTask) {
    return res.status(500).json()
  }
  res.status(204).json()
}

module.exports = init(router)
