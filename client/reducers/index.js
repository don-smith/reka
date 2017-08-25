import {combineReducers} from 'redux'

import errorMessage from './error-message'
import userDetails from './user-details'
import signedIn from './signed-in'
import waiting from './waiting'

export default combineReducers({
  errorMessage,
  userDetails,
  waiting,
  signedIn
})
