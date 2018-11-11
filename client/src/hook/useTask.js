import axios from 'axios'
import { createStore, useStore } from 'react-hookstore'

const taskInit = {
  title: '',
  body: '',
  completed: false
}
createStore({name: 'task', state: taskInit})
createStore({name: 'tasks', state: []})

const useTask = () => {
  const [tasks, setTasks] = useStore('tasks')
  const [task, setTask]   = useStore('task')

  const initTask = () => {
    setTask(taskInit)
  }

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
    console.log(inTask)
    axios.put(`/api/tasks/${inTask._id}`, inTask)
  }

  const postTask = (inTask) => {
    axios.post(`/api/tasks`, inTask)
      .then(res => {
        setTasks([res.data, ...tasks])
      })
      .catch(e => console.log('useTask] postTask', e))
  }

  const handleChangeTitle   = e => {
    setTask({...task, title: e.target.value})
  }
  const handleChangeBody    = e => {
    setTask({...task, body: e.target.value})
  }
  const handleChangeDueDate = e => {
    setTask({...task, dueDate: e.target.value})
  }

  return {
    task, setTask, initTask, getTask, deleteTask, completeTask, putTask, postTask,
    tasks, setTasks, getTasks,
    handleChangeTitle, handleChangeBody, handleChangeDueDate
  }
}

export default useTask
