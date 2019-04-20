import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signIn } from '../actions/auth'
import { clearError } from '../actions/error'
import { withRouter } from 'react-router-dom'

const style = {
  minWidth: '350px',
  maxWidth: '550px',
  marginTop: '4rem'
}

class SignIn extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    const { username, password } = this.state
    const goToEvents = () => this.props.history.push('/events')
    this.props.signIn(username, password, goToEvents)
    e.preventDefault()
  }

  render () {
    const { username, password } = this.state
    return (
      <div className='ui middle center aligned grid'>
        <div style={style}>
          <form className='ui large form'>
            <div className='ui stacked segment'>
              <h2 className='ui header'>Sign In</h2>

              <div className='field'>
                <input data-e2e='username' name='username' placeholder='username'
                  onChange={this.handleChange} value={username} />
              </div>

              <div className='field'>
                <input data-e2e='password' name='password'
                  type='password' placeholder='password'
                  onChange={this.handleChange} value={password} />
              </div>

              <button data-e2e='sign-in-button' className='ui fluid large primary button'
                onClick={this.handleSubmit}>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  signIn: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    signIn: (username, password, onSuccess) => {
      dispatch(clearError())
      dispatch(signIn({ username, password }, onSuccess))
    }
  }
}

export default withRouter(
  connect(null, mapDispatchToProps)(SignIn)
)
