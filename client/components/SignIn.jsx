import React from 'react'
import {connect} from 'react-redux'
import {signIn} from '../actions/auth'
import {clearError} from '../actions/error'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  render () {
    const {signIn} = this.props
    const {username, password} = this.state
    return (
      <div className='sign-in auth-form'>
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
        <button onClick={() => signIn(username, password)}>Sign in</button>
      </div>
    )
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    signIn: (username, password) => {
      dispatch(clearError())
      dispatch(signIn({username, password}))
    }
  }
}

export default connect(null, mapDispatchToProps)(SignIn)
