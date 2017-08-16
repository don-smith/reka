import React from 'react'
import {connect} from 'react-redux'
import {register} from '../actions/registration'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  render () {
    const {register} = this.props
    const {username, password} = this.state
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
            placeholder='password'
            onChange={this.handleChange}
            value={this.state.password} />
        </label>
        <button onClick={() => register(username, password)}>Register</button>
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
    register: (username, password) => {
      dispatch(register({username, password}))
    }
  }
}

export default connect(null, mapDispatchToProps)(Register)
