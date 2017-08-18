import {combineReducers} from 'redux'

import errorMessage from './error-message'
import signedIn from './signed-in'
import waiting from './waiting'

export default combineReducers({
  errorMessage,
  waiting,
  signedIn
})
