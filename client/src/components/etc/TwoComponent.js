import React from 'react'
import { createStore, useStore } from 'react-hookstore'

const OneComponent = () => {
  const [state, dispatch] = useStore('count')

  return (
    <div>
      <h5>two</h5>
      <div className="row">
        <button className="btn" onClick={() => dispatch({count: state.count + 1})}>
          <h1>{state.count}</h1>
        </button>
      </div>
    </div>
  )
}

export default OneComponent
