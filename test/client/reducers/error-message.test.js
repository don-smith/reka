import test from 'ava'

import {SHOW_ERROR, CLEAR_ERROR} from '../../../client/actions/error'
import errorMessage from '../../../client/reducers/error-message'

test('errorMessage returns the error message during SHOW_ERROR', t => {
  const action = {
    type: SHOW_ERROR,
    errorMessage: 'test error message'
  }
  const newState = errorMessage('', action)
  t.is(newState, action.errorMessage)
})

test('errorMessage returns an empty string during CLEAR_ERROR', t => {
  const action = {type: CLEAR_ERROR}
  const newState = errorMessage('current error message', action)
  t.is(newState, '')
})

test('errorMessage returns the current state by default', t => {
  const currentState = 'current error message'
  const action = {type: 'UNKNOWN_ACTION_TYPE'}
  const newState = errorMessage(currentState, action)
  t.is(newState, currentState)
})
