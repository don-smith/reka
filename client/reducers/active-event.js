import {
  REQUEST_EVENT_DETAILS,
  RECEIVE_EVENT_DETAILS
} from '../actions/events'

const initialState = {
  details: null,
  registrations: []
}

const activeEvent = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_EVENT_DETAILS:
      return action.event

    case REQUEST_EVENT_DETAILS:
      return initialState

    default:
      return state
  }
}

export default activeEvent
