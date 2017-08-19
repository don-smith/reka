import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import SignIn from './SignIn'
import Register from './Register'
import AuthActions from './AuthActions'
import ErrorMessage from './ErrorMessage'
import WaitIndicator from './WaitIndicator'

const App = () => {
  return (
    <Router>
      <div className='app'>
        <ErrorMessage />
        <Route path='/' component={WaitIndicator} />
        <Route path='/' component={AuthActions} />
        <Route path='/register' component={Register} />
        <Route path='/signin' component={SignIn} />
      </div>
    </Router>
  )
}

export default App
