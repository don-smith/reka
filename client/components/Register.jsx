import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { register } from '../actions/auth'
import { showError, clearError } from '../actions/error'

const style = {
  minWidth: '350px',
  maxWidth: '550px',
  marginTop: '4rem'
}

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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    const { username, password, confirm, showMatch, match } = this.state
    return (
      <div className='ui middle aligned center aligned grid'>
        <div style={style}>
          <form className='ui large form'>
            <div className='ui stacked segment'>
              <h2 className='ui header'>Register</h2>

              <div className='field'>
                <input id='username' name='username' placeholder='username'
                  onChange={this.handleChange} value={username} />
              </div>

              <div className='field'>
                <input id='password' name='password'
                  type='password' placeholder='password'
                  onChange={this.handleChange} value={password} />
              </div>

              <div className='field'>
                <input id='confirm' name='confirm'
                  type='password' placeholder='confirm password'
                  onChange={this.handleChange} value={confirm} />
              </div>

              {showMatch && !match && <span style={this.styles.match}>*</span>}
              <button className='ui fluid large primary button'
                onClick={this.handleSubmit}>Register</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  handleChange (e) {
    const { name, value } = e.target
    let match = this.state.match
    match = name === 'password' ? value === this.state.confirm : match
    match = name === 'confirm' ? value === this.state.password : match
    this.setState({
      [name]: value,
      showMatch: this.state.showMatch || name === 'confirm',
      match: match
    })
  }

  handleSubmit (e) {
    const { register } = this.props
    const { username, password, confirm } = this.state
    register(username, password, confirm)
    e.preventDefault()
  }
}

Register.propTypes = {
  register: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    register: (username, password, confirm) => {
      if (password === confirm) {
        dispatch(clearError())
        return dispatch(register({ username, password }))
      }
      dispatch(showError('Password and confirmation don\'t match'))
    }
  }
}

export default connect(null, mapDispatchToProps)(Register)
