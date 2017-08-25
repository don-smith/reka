import {combineReducers} from 'redux'

import errorMessage from './error-message'
import userDetails from './user-details'
import waiting from './waiting'

export default combineReducers({
  errorMessage,
  userDetails,
  waiting
})
