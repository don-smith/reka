import test from 'ava'
import sinon from 'sinon'

import apiStub from '../stubs/api'
import saveAuthTokenStub from '../stubs/save-auth-token'

import {CLEAR_ERROR} from '../../../client/actions/error'

/* add eslint flag so import/first won't complain */
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

test.afterEach(() => {
  apiStub.resetHistory()
  saveAuthTokenStub.resetHistory()
})

test('register() dispatches the correct actions', t => {
  const dispatch = sinon.spy()
  return register()(dispatch)
    .then(() => {
      t.is(dispatch.getCall(0).args[0].type, REQUEST_REGISTRATION)
      t.is(dispatch.getCall(1).args[0].type, RECEIVE_REGISTRATION)
      t.is(typeof dispatch.getCall(2).args[0], 'function')
      t.is(dispatch.getCall(3).args[0].type, CLEAR_ERROR)
    })
})
