import {
  REQUEST_REGISTRATION,
  RECEIVE_REGISTRATION,
  REQUEST_SIGNIN,
  RECEIVE_SIGNIN,
  LOG_OFF} from '../actions/auth'
import {isAuthenticated} from '../lib/auth'

const authd = isAuthenticated()

const signedIn = (state = authd, action) => {
  switch (action.type) {
    case REQUEST_SIGNIN:
      return false

    case RECEIVE_SIGNIN:
      return true

    case REQUEST_REGISTRATION:
      return false

    case RECEIVE_REGISTRATION:
      return true

    case LOG_OFF:
      return false

    default:
      return state
  }
}

export default signedIn
