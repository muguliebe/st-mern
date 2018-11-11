import React, { useEffect } from 'react'
import useTask from '../../hook/useTask'
import moment from 'moment'


const TaskEdit = (props) => {
  const {task, setTask, getTask, putTask} = useTask()

  useEffect(() => {
    getTask(props.match.params.id)
  }, [])

  const handleTitleChange   = e => {
    setTask({...task, title: e.target.value})
  }
  const handleBodyChange    = e => {
    setTask({...task, body: e.target.value})
  }
  const handleDueDateChange = e => {
    setTask({...task, dueDate: e.target.value})
  }

  const handleSubmit = e =>  {
    e.preventDefault()
    putTask(task)
    props.history.push('/tasks')
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <form className="custom-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" name="title"
                 placeholder="Title"
                 value={task.title}
                 onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea placeholder="Body"
                    className="form-control"
                    name="body" id="body" cols="30"
                    rows="10"
                    value={task.body}
                    onChange={handleBodyChange} />
        </div>
        <div className="form-group">
          <label htmlFor="due-date">Due Date</label>
          <input name="due-date" type="date" className="form-control" id="due-date" placeholder="Due Date"
                 value={moment(task.dueDate).format('YYYY-MM-DD')}
                 onChange={handleDueDateChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-secondary">Save Changes</button>
        </div>
      </form>

    </div>
  )
}

export default TaskEdit
