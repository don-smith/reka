import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

import {logOff} from '../actions/auth'
import BusyIndicator from './BusyIndicator'

class AuthActions extends React.Component {
  constructor (props) {
    super(props)
    this.handleLogOff = this.handleLogOff.bind(this)
  }

  render () {
    const {signedIn} = this.props
    return (
      <div className='header'>
        <div className='home-menu pure-menu pure-menu-horizontal pure-menu-fixed'>
          <Link to='/' className='pure-menu-heading'>Reka</Link>
          <BusyIndicator />
          <ul className='pure-menu-list'>
            <li className='pure-menu-item pure-menu-selected'>
              <Link to='/' className='pure-menu-link'>Home</Link>
            </li>
            {!signedIn && <li className='pure-menu-item'>
              <Link to='/register' className='pure-menu-link'>Register</Link>
            </li>}
            {!signedIn && <li className='pure-menu-item'>
              <Link to='/signin' className='pure-menu-link'>Sign in</Link>
            </li>}
            {signedIn && <li className='pure-menu-item'>
              <Link to='/profile' className='pure-menu-link'>Profile</Link>
            </li>}
            {signedIn && <li className='pure-menu-item'>
              <a href='#' className='pure-menu-link' onClick={this.handleLogOff}>Log off</a>
            </li>}
          </ul>
        </div>
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

function mapStateToProps ({userDetails}) {
  return {signedIn: !!userDetails}
}

export default withRouter(
  connect(mapStateToProps)(AuthActions)
)
