import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TaskItem from './TaskItem'

const TaskAll = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('/api/tasks')
      .then(res => setTasks(res.data))
      .catch(e => console.log('TaskAll]', e))
  }, [])

  return (
    <div>
      <div className="d-flex flex-column">
        <h1>Tasks</h1>

        <div className="mb-4">
          <a href="#" className="btn btn-success ml-2">Create Task</a>
        </div>

        <div className="d-flex flex-wrap justify-content-start">
           task loop
        </div>
      </div>
    </div>
  )
}

export default TaskAll
