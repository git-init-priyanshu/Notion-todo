import * as React from 'react';
import './App.css'
import Status from './components/status';

function App() {
  return (
    <div className='text-2xl text-blue-500'>
      <Status status="Not started"/>
    </div>
  )
}

export default App
