import React, { useEffect } from 'react'
import useTask from '../../hook/useTask'
import TaskForm from './TaskForm'


const TaskEdit = (props) => {
  const taskStore = useTask()

  useEffect(() => {
    taskStore.getTask(props.match.params.id)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    taskStore.putTask(taskStore.task)
    props.history.push('/tasks')
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm task={taskStore.task}
                buttonName={'save'}
                handleSubmit={handleSubmit}
                handleChangeTitle={taskStore.handleChangeTitle}
                handleChangeBody={taskStore.handleChangeBody}
                handleChangeDueDate={taskStore.handleChangeDueDate}
      />
    </div>
  )
}

export default TaskEdit
