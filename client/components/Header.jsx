import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { getUserDetails, logOff } from '../actions/auth'
import { isAuthenticated, getAuthToken } from '../lib/auth'
import BusyIndicator from './BusyIndicator'

export class Header extends React.Component {
  constructor (props) {
    super(props)
    this.handleLogOff = this.handleLogOff.bind(this)
  }

  componentDidMount () {
    // populate the store with user details if an auth token is in localStorage
    if (this.props.signedIn && !this.props.userDetails) {
      const token = getAuthToken()
      this.props.dispatch(getUserDetails(token.id))
    }
  }

  render () {
    const activeItem = isSelected => {
      return isSelected ? 'active item' : 'item'
    }

    const { signedIn, atHome, atEvents, atProfile } = this.props
    return (
      <div className='header'>
        <div className='ui large top menu'>
          <div className='ui container'>
            <Link to='/' className={activeItem(atHome)}>Home</Link>
            <BusyIndicator />
            <div className='right menu'>
              {!signedIn && <Link to='/register' className='item'>Register</Link>}
              {!signedIn && <Link to='/signin' className='item'>Sign in</Link>}
              {signedIn && <Link to='/events' className={activeItem(atEvents)}>Events</Link>}
              {signedIn && <Link to='/profile' className={activeItem(atProfile)}>Profile</Link>}
              {signedIn && <a href='#' className='item' onClick={this.handleLogOff}>Log off</a>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleLogOff (e) {
    const { dispatch, history } = this.props
    e.preventDefault()
    dispatch(logOff())
    history.push('/')
  }
}

Header.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    listen: PropTypes.func
  }),
  signedIn: PropTypes.bool,
  userDetails: PropTypes.object,
  atHome: PropTypes.bool,
  atEvents: PropTypes.bool,
  atProfile: PropTypes.bool
}

function mapStateToProps ({ userDetails }, ownProps) {
  const path = ownProps.history.location.pathname
  return {
    atHome: path === '/',
    atEvents: path.includes('events'),
    atProfile: path.includes('profile'),
    signedIn: isAuthenticated(),
    userDetails
  }
}

export default withRouter(
  connect(mapStateToProps)(Header)
)
