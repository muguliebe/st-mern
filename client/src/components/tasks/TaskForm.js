import React from 'react'
import moment from 'moment'

const TaskForm = ({
                    task,
                    buttonName,
                    handleChangeTitle,
                    handleChangeBody,
                    handleChangeDueDate,
                    handleSubmit
                  }) => {
  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" className="form-control" name="title" placeholder="Title"
               value={task.title} onChange={handleChangeTitle}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea placeholder="Body" className="form-control" name="body" id="body" cols="30" rows="10"
                  value={task.body} onChange={handleChangeBody}
        />
      </div>
      <div className="form-group">
        <label htmlFor="due-date">Due Date</label>
        <input id="due-date" name="due-date" type="date" className="form-control" placeholder="Due Date"
               value={moment(task.dueDate).format('YYYY-MM-DD')}
               onChange={handleChangeDueDate}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-secondary">{buttonName}</button>
      </div>
    </form>
  )
}

export default TaskForm
