import React, { useEffect, useState } from 'react'

const TaskItem = (props) => {
  const [task, setTask] = useState({title: '', body: ''})
  useEffect(() => {
    setTask(props.task)
  }, [])

  return (
    <div>
      <div className="card mb-2 ml-2 text-white bg-dark" style={{width: '18rem'}}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">title</h5>
            <span className="small">date</span>
          </div>

          <h6 className="card-subtitle mb-2 text-muted">
            Created by userName
          </h6>

          <p className="card-text">body</p>

          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" />
            <label>Completed</label>
          </div>

          <div className="d-flex justify-content-between">
            <a href="#" type="button" className="card-link btn btn-primary">Edit
            </a>
            <a className="card-link btn btn-danger" href="#">Delete</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
