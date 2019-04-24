import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import { isAuthenticated, getToken } from 'authenticare/client'

import { getUserDetails, logOff } from '../actions/auth'

class DesktopMenu extends React.Component {
  componentDidMount () {
    // populate the store with user details if an auth token is in localStorage
    if (this.props.signedIn && !this.props.userDetails) {
      const token = getToken()
      this.props.dispatch(getUserDetails(token.id))
    }
  }

  handleLogOff = (e) => {
    const { dispatch, history } = this.props
    e.preventDefault()
    dispatch(logOff())
    history.push('/')
  }

  render () {
    const {
      fixed, signedIn, atHome, atEvents, atProfile, atSignIn, atRegister
    } = this.props

    return (
      <Menu
        style={{ backgroundColor: atHome ? 'transparent' : 'white' }}
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        pointing={true}
        secondary={true}
        size='large'>
        <Container>
          <Menu.Item>
            <Menu.Item
              as={Link}
              to='/'
              active={atHome}>Home</Menu.Item>
            {signedIn && <Menu.Item
              as={Link}
              to='/events'
              active={atEvents}>Events</Menu.Item>}
          </Menu.Item>
          <Menu.Item position='right'>
            {signedIn && <Menu.Item
              as={Link}
              to='/profile'
              active={atProfile}>Profile</Menu.Item>}
            {signedIn && <Menu.Item
              as={Link}
              to='#'
              onClick={this.handleLogOff}>Log off</Menu.Item> }
            {!signedIn && <Menu.Item
              as={Link}
              to='/register'
              active={atRegister}>Register</Menu.Item> }
            {!signedIn && <Menu.Item
              as={Link}
              to='/signin'
              active={atSignIn}>Sign in</Menu.Item> }
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}

DesktopMenu.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  fixed: PropTypes.bool,
  signedIn: PropTypes.bool,
  atHome: PropTypes.bool,
  atEvents: PropTypes.bool,
  atProfile: PropTypes.bool,
  atSignIn: PropTypes.bool,
  atRegister: PropTypes.bool,
  userDetails: PropTypes.object
}

function mapStateToProps ({ userDetails }, ownProps) {
  const path = ownProps.history.location.pathname
  return {
    fixed: ownProps.fixed,
    atHome: path === '/',
    atEvents: path.includes('events'),
    atProfile: path.includes('profile'),
    atSignIn: path.includes('signin'),
    atRegister: path.includes('register'),
    signedIn: isAuthenticated(),
    userDetails
  }
}

export default withRouter(
  connect(mapStateToProps)(DesktopMenu)
)
