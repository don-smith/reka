import React from 'react'
import {connect} from 'react-redux'

import {register} from '../actions/auth'
import {showError, clearError} from '../actions/error'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirm: '',
      match: false,
      showMatch: false
    }
    this.styles = {
      match: {
        color: 'red'
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  render () {
    const {register} = this.props
    const {username, password, confirm, showMatch, match} = this.state
    return (
      <div>
        <label>
          <input name='username'
            placeholder='username'
            onChange={this.handleChange}
            value={this.state.username} />
        </label>
        <label>
          <input name='password'
            type='password'
            placeholder='password'
            onChange={this.handleChange}
            value={this.state.password} />
        </label>
        <label>
          <input name='confirm'
            type='password'
            placeholder='confirm'
            onChange={this.handleChange}
            value={this.state.confirm} />
        </label>
        {showMatch && !match && <span style={this.styles.match}>*</span>}
        <button onClick={() => register(username, password, confirm)}>Register</button>
      </div>
    )
  }

  handleChange (e) {
    const {name, value} = e.target
    let match = this.state.match
    match = name === 'password' ? value === this.state.confirm : match
    match = name === 'confirm' ? value === this.state.password : match
    this.setState({
      [name]: value,
      showMatch: this.state.showMatch || name === 'confirm',
      match: match
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    register: (username, password, confirm) => {
      if (password === confirm) {
        dispatch(clearError())
        return dispatch(register({username, password}))
      }
      dispatch(showError('Password and confirmation don\'t match'))
    }
  }
}

export default connect(null, mapDispatchToProps)(Register)
