import React, { useState } from 'react'

const HookComponent = () => {
  const [count, setCount] = useState(0)
  const [state, setState] = useState({
    value1: '',
    value2: ''
  })

  return (
    <div>
      <div className="row">
        <button className="btn btn-danger" onClick={() => setCount(count + 1)}>
          <h3>{count}</h3>
        </button>
      </div>
      <div className="row mt-1">
        <input className="form-control col-5"
               type="text"
               onChange={e => setState({...state, value1: e.target.value})} />
        <label className="col-5">{state.value1}</label>
      </div>
      <div className="row mt-1">
        <input className="form-control col-5"
               type="text"
               onChange={e => setState({...state, value2: e.target.value})} />
        <label className="control-label col-5">{state.value2}</label>
      </div>
    </div>
  )
}

export default HookComponent
