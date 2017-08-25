import {
  REQUEST_USER_DETAILS,
  RECEIVE_USER_DETAILS
} from '../actions/auth'

const userDetails = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER_DETAILS:
      return action.userDetails

    default:
      return state
  }
}

export default userDetails
