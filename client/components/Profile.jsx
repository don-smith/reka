import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'

import { updateProfile } from '../actions/auth'
import { showError, clearError } from '../actions/error'
import ResponsiveContainer from './ResponsiveContainer'

class Profile extends React.Component {
  state = {
    username: this.props.username,
    currentPassword: '',
    newPassword: '',
    confirm: '',
    match: false,
    showMatch: false
  }

  styles = {
    match: {
      color: 'red'
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    let match = this.state.match
    match = name === 'newPassword' ? value === this.state.confirm : match
    match = name === 'confirm' ? value === this.state.newPassword : match
    this.setState({
      [name]: value,
      showMatch: this.state.showMatch || name === 'confirm',
      match: match
    })
  }

  handleSubmit = e => {
    const { id, updateProfile } = this.props
    const { username, currentPassword, newPassword, confirm } = this.state
    updateProfile(id, username, currentPassword, newPassword, confirm)
    e.preventDefault()
    this.setState({
      currentPassword: '',
      newPassword: '',
      confirm: ''
    })
  }

  render () {
    const {
      username, currentPassword, newPassword, confirm, showMatch, match
    } = this.state

    return (
      <ResponsiveContainer>
        <div className='ui grid'>
          <Form size='large'>
            <div className='ui stacked'>
              <h2 className='ui header'>Profile</h2>

              <Form.Input data-e2e='username' name='username' label='Username'
                onChange={this.handleChange} value={username} />

              <Form.Input data-e2e='currentPassword' name='currentPassword'
                type='password' label='Current password'
                onChange={this.handleChange} value={currentPassword} />

              <Form.Input data-e2e='newPassword' name='newPassword'
                type='password' label='New password'
                onChange={this.handleChange} value={newPassword} />

              <Form.Input data-e2e='confirm' name='confirm'
                type='password' label='Confirm password'
                onChange={this.handleChange} value={confirm} />

              {showMatch && !match && <span style={this.styles.match}>*</span>}
              <Button data-e2e='update-button' fluid primary
                onClick={this.handleSubmit}>Update profile</Button>
            </div>
          </Form>
        </div>
      </ResponsiveContainer>
    )
  }
}

Profile.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  updateProfile: PropTypes.func
}

function mapStateToProps ({ userDetails }) {
  return userDetails || {}
}

function mapDispatchToProps (dispatch) {
  return {
    updateProfile: (id, username, currentPassword, newPassword, confirm) => {
      if (newPassword === confirm) {
        dispatch(clearError())
        return dispatch(updateProfile(
          { id, username, currentPassword, newPassword }
        ))
      }
      dispatch(showError('New password and confirmation don\'t match'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
