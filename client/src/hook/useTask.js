import React from 'react'
import axios from 'axios'
import { createStore, useStore } from 'react-hookstore'

createStore({name: 'tasks', state: []})

const useTask = () => {
  const [tasks, setTasks] = useStore('tasks')

  const getTasks = () => {
    axios.get('/api/tasks')
      .then(res => setTasks(res.data))
      .catch(e => console.log('useTask]', e))
  }

  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(() => {
        const index = tasks.findIndex(task => task._id === id)
        tasks.splice(index, 1)
        setTasks(tasks)
      })
      .catch(e => console.log('useTask]', e))
  }

  return {tasks, getTasks, deleteTask}
}

export default useTask
