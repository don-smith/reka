import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

import {logOff} from '../actions/auth'

class AuthActions extends React.Component {
  constructor (props) {
    super(props)
    this.handleLogOff = this.handleLogOff.bind(this)
  }

  render () {
    const {signedIn} = this.props
    return (
      <div className='auth-actions'>
        <Link to='/'>Home</Link>
        {!signedIn && <Link to='/register'>Register</Link>}
        {!signedIn && <Link to='/signin'>Sign in</Link>}
        {signedIn && <Link to='/profile'>Profile</Link>}
        {signedIn && <a href='#' onClick={this.handleLogOff}>Log off</a>}
      </div>
    )
  }

  handleLogOff (e) {
    const {dispatch, history} = this.props
    e.preventDefault()
    dispatch(logOff())
    history.push('/')
  }
}

function mapStateToProps ({signedIn}) {
  return {signedIn}
}

export default withRouter(
  connect(mapStateToProps)(AuthActions)
)
