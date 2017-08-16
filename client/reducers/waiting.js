import {SHOW_ERROR} from '../actions/error'
import {REQUEST_REGISTRATION, RECEIVE_REGISTRATION} from '../actions/registration'

const waiting = (state = false, action) => {
  switch (action.type) {
    case REQUEST_REGISTRATION:
      return true

    case RECEIVE_REGISTRATION:
      return false

    case SHOW_ERROR:
      return false

    default:
      return state
  }
}

export default waiting
