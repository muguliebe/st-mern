import React, { useEffect, useState } from 'react'
import moment from 'moment'
import useTask from '../../hook/useTask'

const TaskItem = (props) => {
  const taskStore = useTask()
  let [task, setTask] = useState({title: '', body: '', complete: false})
  useEffect(() => {
    setTask(props.task)
  }, [])

  const handleComplete = () => {
    // taskStore.eTask(task._id)
  }
  const handleDelete = () => {
    taskStore.deleteTask(task._id)
  }

  return (
    <div>
      <div className="card mb-2 ml-2 text-white bg-dark" style={{width: '18rem'}}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{task.title}</h5>
            <span className="small">{moment(task.dueDate).format('YYYY-MM-DD')}</span>
          </div>

          <h6 className="card-subtitle mb-2 text-muted">
            Created by {task.author}
          </h6>

          <p className="card-text">{task.body}</p>

          <div className="form-group form-check">
            <input type="checkbox"
                   className="form-check-input"
                   value={task.completed}
                   disabled={task.complete}
                   onChange={handleComplete} />

            <label>Completed</label>
          </div>

          <div className="d-flex justify-content-between">
            <a href="#" type="button" className="card-link btn btn-primary">Edit
            </a>
            <button className="card-link btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
