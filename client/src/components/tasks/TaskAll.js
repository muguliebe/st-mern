import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import TaskItem from './TaskItem'
import useTask from '../../hook/useTask'


const TaskAll = () => {
  const taskStore = useTask()

  useEffect(() => {
    taskStore.getTasks()
  }, [])

  return (
    <div>
      <div className="d-flex flex-column">
        <h1>Tasks</h1>

        <div className="mb-4">
          <Link to={`/tasks/new`}>
          <button className="btn btn-success ml-2">Create Task</button>
          </Link>
        </div>

        <div className="d-flex flex-wrap justify-content-start">
          {taskStore.tasks.map(task => <TaskItem key={task._id} task={task} />)}
        </div>
      </div>
    </div>
  )
}

export default TaskAll
