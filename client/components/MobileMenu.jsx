import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container, Menu, Sidebar, Icon } from 'semantic-ui-react'

import { getUserDetails, logOff } from '../actions/auth'
import { isAuthenticated, getAuthToken } from '../lib/auth'

class MobileMenu extends React.Component {
  componentDidMount () {
    // populate the store with user details if an auth token is in localStorage
    if (this.props.signedIn && !this.props.userDetails) {
      const token = getAuthToken()
      this.props.dispatch(getUserDetails(token.id))
    }
  }

  handleLogOff = (e) => {
    const { dispatch, history } = this.props
    e.preventDefault()
    dispatch(logOff())
    history.push('/')
  }

  handleToggle = () => this.props.handleToggle(true)
  handleSidebarHide = () => this.props.handleToggle(false)

  render () {
    const { sidebarOpened, inverted, signedIn, atHome, atEvents, atProfile } = this.props

    return (
      <Sidebar
        as={Menu}
        animation='push'
        inverted={inverted}
        onHide={this.handleSidebarHide}
        vertical
        visible={sidebarOpened}>
        <Menu.Item
          as={Link}
          to='/'
          active={atHome}>Home</Menu.Item>
        {signedIn && <Menu.Item
          as={Link}
          to='/events'
          active={atEvents}>Events</Menu.Item>}
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
          to='/register'>Register</Menu.Item> }
        {!signedIn && <Menu.Item
          as={Link}
          to='/signin'>Sign in</Menu.Item> }
      </Sidebar>
    )
  }
}

MobileMenu.propTypes = {
  signedIn: PropTypes.bool,
  inverted: PropTypes.bool,
  atHome: PropTypes.bool,
  atEvents: PropTypes.bool,
  atProfile: PropTypes.bool,
  sidebarOpened: PropTypes.bool,
  handleToggle: PropTypes.func,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  userDetails: PropTypes.object
}

function mapStateToProps ({ userDetails }, ownProps) {
  const path = ownProps.history.location.pathname
  return {
    atHome: path === '/',
    atEvents: path.includes('events'),
    atProfile: path.includes('profile'),
    sidebarOpened: ownProps.sidebarOpened, // NEEDED?
    signedIn: isAuthenticated(),
    userDetails
  }
}

export default withRouter(
  connect(mapStateToProps)(MobileMenu)
)
