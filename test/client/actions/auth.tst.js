import test from 'ava'
import sinon from 'sinon'

// Mock the api module
import * as api from '../../../client/lib/api'
sinon.spy(api.default).andReturn(Promise.resolve({
  body: {token: {id: 'test token'}}
}))
// api.default = (method, endpoint, payload) => {
//   return Promise.resolve({
//     body: {token: {id: 'test token'}}
//   })
// }

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

test('register() dispatches requestRegistration()', t => {
  register()(action => {
    t.is(action.type, REQUEST_REGISTRATION)
    return Promise.resolve()
  })
})
