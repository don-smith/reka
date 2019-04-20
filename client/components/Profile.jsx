import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
          <form className='ui large form'>
            <div className='ui stacked'>
              <h2 className='ui header'>Profile</h2>

              <div className='field'>
                <input id='username' name='username' placeholder='username'
                  onChange={this.handleChange} value={username} />
              </div>

              <div className='field'>
                <input id='currentPassword' name='currentPassword'
                  type='password' placeholder='current password'
                  onChange={this.handleChange} value={currentPassword} />
              </div>

              <div className='field'>
                <input id='newPassword' name='newPassword'
                  type='password' placeholder='newPassword'
                  onChange={this.handleChange} value={newPassword} />
              </div>

              <div className='field'>
                <input id='confirm' name='confirm'
                  type='password' placeholder='confirm password'
                  onChange={this.handleChange} value={confirm} />
              </div>

              {showMatch && !match && <span style={this.styles.match}>*</span>}
              <button data-e2e='update-button' className='ui fluid large primary button'
                onClick={this.handleSubmit}>Update profile</button>
            </div>
          </form>
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
