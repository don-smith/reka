import React from 'react'

import ErrorMessage from './ErrorMessage'
import Register from './Register'
import WaitIndicator from './WaitIndicator'

const App = () => (
  <div className='app'>
    <WaitIndicator />
    <ErrorMessage />
    <Register />
  </div>
)

export default App
