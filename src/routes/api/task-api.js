const {required, isEmpty} = require('../../validation')
const router              = require('express').Router()
const Task                = require('../../models/task-model')

function init(router) {
  const url = '/api/task'

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
    if (err) res.status(500).json()
    res.status(201).json(task)
  })
}

const getTasks = async (req, res) => {
  const task = await Task.find()
  if (!task || task.length === 0) {
    return res.status(404).json({errors: 'there is no task'})
  }
  res.json(task)
}

const getTask = async (req, res) => {
  const task = await Task.findOne({_id: req.params.id})
  if (!task) {
    return res.status(404).json({errors: 'there is no task'})
  }
  res.json(task)
}

const putTask = async (req, res) => {
  const error = required(req.body, ['title', 'body'])
  if (!isEmpty(error)) {
    return res.status(400).json(error)
  }

  const task        = new Task(req.body)
  const updatedTask = Task.findByIdAndUpdate({_id: req.params.id}, task)
  if (!updatedTask) {
    return res.status(500).json({errors: 'there is no task'})
  }
  res.json(updatedTask)
}

const deleteTask = async (req, res) => {
  const error = required(req.body, ['title', 'body'])
  if (!isEmpty(error)) {
    return res.status(400).json(error)
  }

  const task        = new Task(req.body)
  const deletedTask = await Task.findByIdAndDelete({_id: task._id})
  if (deletedTask) {
    return res.status(500).json()
  }
  res.status(204).json()
}

module.exports = init(router)
