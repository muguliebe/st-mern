import React, { useEffect } from 'react'
import TaskForm from './TaskForm'
import useTask from '../../hook/useTask'

const TaskCreate = (props) => {
  const taskStore = useTask()

  useEffect(() => {
    taskStore.initTask()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    taskStore.postTask(taskStore.task)
    props.history.push('/tasks')
  }

  return (
    <div>
      <h1>Create Task</h1>
      <TaskForm task={taskStore.task}
                buttonName={'create'}
                handleSubmit={handleSubmit}
                handleChangeTitle={taskStore.handleChangeTitle}
                handleChangeBody={taskStore.handleChangeBody}
                handleChangeDueDate={taskStore.handleChangeDueDate}
      />
    </div>
  )
}

export default TaskCreate
