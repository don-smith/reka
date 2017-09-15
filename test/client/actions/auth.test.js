import '../mocks/api'
import '../mocks/save-auth-token'

import {CLEAR_ERROR} from '../../../client/actions/error'

import {
  LOG_OFF,
  REQUEST_SIGNIN,
  RECEIVE_SIGNIN,
  REQUEST_REGISTRATION,
  RECEIVE_REGISTRATION,
  REQUEST_USER_DETAILS,
  RECEIVE_USER_DETAILS,
  REQUEST_UPDATE_PROFILE,
  RECEIVE_UPDATE_PROFILE,
  register,
  logOff,
  signIn,
  updateProfile,
  getUserDetails
} from '../../../client/actions/auth'

test('register() dispatches the correct actions', () => {
  const dispatch = jest.fn()
  return register()(dispatch)
    .then(() => {
      expect(dispatch.mock.calls[0][0].type).toBe(REQUEST_REGISTRATION)
      expect(dispatch.mock.calls[1][0].type).toBe(RECEIVE_REGISTRATION)
      expect(typeof dispatch.mock.calls[2][0]).toBe('function')
      expect(dispatch.mock.calls[3][0].type).toBe(CLEAR_ERROR)
    })
})
