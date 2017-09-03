import {
  REQUEST_EVENT_LIST,
  RECEIVE_EVENT_LIST
} from '../actions/events'

const initialState = {
  hosted: [],
  attended: []
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_EVENT_LIST:
      return action.events

    case REQUEST_EVENT_LIST:
      return initialState

    default:
      return state
  }
}

export default events
