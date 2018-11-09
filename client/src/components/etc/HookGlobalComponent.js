import React from 'react'
import { createStore, useStore } from 'react-hookstore';
import OneComponent from './OneComponent'
import TwoComponent from './TwoComponent'

createStore({name: 'count', state: {count: 1}});
const HookGlobalComponent = () => {

  return (
    <div>
      <h1>hook global</h1>
      <OneComponent/>
      <TwoComponent/>
    </div>
  )
}

export default HookGlobalComponent
