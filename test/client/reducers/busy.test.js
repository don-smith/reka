import {SHOW_ERROR} from '../../../client/actions/error'
import {
  REQUEST_SIGNIN,
  RECEIVE_SIGNIN,
  REQUEST_REGISTRATION,
  RECEIVE_REGISTRATION,
  REQUEST_USER_DETAILS,
  RECEIVE_USER_DETAILS} from '../../../client/actions/auth'
import {
  RECEIVE_ADD_EVENT,
  REQUEST_ADD_EVENT} from '../../../client/actions/events'
import busy from '../../../client/reducers/busy'

const state = false

test('busy returns true for REQUEST_REGISTRATION', () => {
  const action = {type: REQUEST_REGISTRATION}
  const newState = busy(state, action)
  expect(newState).toBe(true)
})

test('busy returns false for RECEIVE_REGISTRATION', () => {
  const action = {type: RECEIVE_REGISTRATION}
  const newState = busy(state, action)
  expect(newState).toBe(false)
})

test('busy returns true for REQUEST_SIGNIN', () => {
  const action = {type: REQUEST_SIGNIN}
  const newState = busy(state, action)
  expect(newState).toBe(true)
})

test('busy returns false for RECEIVE_SIGNIN', () => {
  const action = {type: RECEIVE_SIGNIN}
  const newState = busy(state, action)
  expect(newState).toBe(false)
})

test('busy returns true for REQUEST_ADD_EVENT', () => {
  const action = {type: REQUEST_ADD_EVENT}
  const newState = busy(state, action)
  expect(newState).toBe(true)
})

test('busy returns false for RECEIVE_ADD_EVENT', () => {
  const action = {type: RECEIVE_ADD_EVENT}
  const newState = busy(state, action)
  expect(newState).toBe(false)
})

test('busy returns true for REQUEST_USER_DETAILS', () => {
  const action = {type: REQUEST_USER_DETAILS}
  const newState = busy(state, action)
  expect(newState).toBe(true)
})

test('busy returns false for RECEIVE_USER_DETAILS', () => {
  const action = {type: RECEIVE_USER_DETAILS}
  const newState = busy(state, action)
  expect(newState).toBe(false)
})

test('busy returns false for SHOW_ERROR', () => {
  const action = {type: SHOW_ERROR}
  const newState = busy(state, action)
  expect(newState).toBe(false)
})

test('busy returns the current state by default', () => {
  const currentState = true
  const action = {type: 'UNKNOWN_ACTION_TYPE'}
  const newState = busy(currentState, action)
  expect(newState).toBe(currentState)
})
