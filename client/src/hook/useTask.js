import axios from 'axios'
import { createStore, useStore } from 'react-hookstore'

createStore({name: 'task', state: {title: '', body: '', completed: false}})
createStore({name: 'tasks', state: []})

const useTask = () => {
  const [tasks, setTasks] = useStore('tasks')
  const [task, setTask] = useStore('task')

  const getTask = (id) => {
    axios.get(`/api/tasks/${id}`)
      .then(res => setTask(res.data))
      .catch(e => console.log('useTask]', e))
  }

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

  const completeTask = (inTask) => {
    inTask.completed = true
    axios.put(`/api/tasks/${inTask._id}`, inTask)
      .then((res) => {
        tasks.filter(task => task._id === res._id)
          .forEach(task => task = res.data)
        setTasks(tasks)
      })
  }

  const putTask = (inTask) => {
    axios.put(`/api/tasks/${inTask._id}`, inTask)
  }

  return {task, setTask, tasks, setTasks, getTask, getTasks, deleteTask, completeTask, putTask}
}

export default useTask
