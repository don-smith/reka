import {SHOW_ERROR} from '../actions/error'
import {
  REQUEST_SIGNIN,
  RECEIVE_SIGNIN,
  REQUEST_REGISTRATION,
  RECEIVE_REGISTRATION,
  REQUEST_USER_DETAILS,
  RECEIVE_USER_DETAILS} from '../actions/auth'
import {RECEIVE_ADD_EVENT, REQUEST_ADD_EVENT} from '../actions/events'

const busy = (state = false, action) => {
  switch (action.type) {
    case REQUEST_REGISTRATION:
      return true

    case RECEIVE_REGISTRATION:
      return false

    case REQUEST_SIGNIN:
      return true

    case RECEIVE_SIGNIN:
      return false

    case REQUEST_ADD_EVENT:
      return true

    case RECEIVE_ADD_EVENT:
      return false

    case REQUEST_USER_DETAILS:
      return true

    case RECEIVE_USER_DETAILS:
      return false

    case SHOW_ERROR:
      return false

    default:
      return state
  }
}

export default busy
