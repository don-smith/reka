import {combineReducers} from 'redux'

import errorMessage from './error-message'
import userDetails from './user-details'
import events from './events'
import busy from './busy'

export default combineReducers({
  errorMessage,
  userDetails,
  events,
  busy
})
