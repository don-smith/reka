import {SHOW_ERROR} from '../actions/error'
import {
  REQUEST_SIGNIN,
  RECEIVE_SIGNIN,
  REQUEST_USER_DETAILS,
  RECEIVE_USER_DETAILS,
  REQUEST_USER_REGISTRATION,
  RECEIVE_USER_REGISTRATION} from '../actions/auth'
import {
  REQUEST_EVENT_REGISTRATION,
  RECEIVE_EVENT_REGISTRATION} from '../actions/registrations'
import {RECEIVE_ADD_EVENT, REQUEST_ADD_EVENT} from '../actions/events'

const busy = (state = false, action) => {
  switch (action.type) {
    case REQUEST_USER_REGISTRATION:
      return true

    case RECEIVE_USER_REGISTRATION:
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

    case REQUEST_EVENT_REGISTRATION:
      return true

    case RECEIVE_EVENT_REGISTRATION:
      return false

    case SHOW_ERROR:
      return false

    default:
      return state
  }
}

export default busy
