import request from '../lib/api'
import {showError, clearError} from './error'
import {saveAuthToken, logOff as logOffUser} from '../lib/auth'

export const LOG_OFF = 'LOG_OFF'
export const REQUEST_SIGNIN = 'REQUEST_SIGNIN'
export const RECEIVE_SIGNIN = 'RECEIVE_SIGNIN'
export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION'
export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION'

const requestRegistration = () => {
  return {
    type: REQUEST_REGISTRATION
  }
}

const receiveRegistration = (token) => {
  return {
    type: RECEIVE_REGISTRATION,
    token
  }
}

const requestSignIn = () => {
  return {
    type: REQUEST_SIGNIN
  }
}

const receiveSignIn = (token) => {
  return {
    type: RECEIVE_SIGNIN,
    token
  }
}

export const logOff = () => {
  logOffUser()
  return {
    type: LOG_OFF
  }
}

export function signIn (user) {
  return (dispatch) => {
    dispatch(requestSignIn())
    request('post', '/auth/signin', user)
      .then(res => {
        saveAuthToken(res.body.token)
        dispatch(receiveSignIn(res.body))
        dispatch(clearError())
      })
      .catch(err => {
        const res = err.response.body
        const msg = 'Username and password don\'t match an existing user'
        if (res && res.errorType === 'INVALID_CREDENTIALS') {
          return dispatch(showError(msg))
        }
        dispatch(showError('An unexpected error has occurred.'))
      })
  }
}

export function register (newUser) {
  return (dispatch) => {
    dispatch(requestRegistration())
    request('post', '/auth/register', newUser)
      .then(res => {
        saveAuthToken(res.body.token)
        dispatch(receiveRegistration(res.body))
        dispatch(clearError())
      })
      .catch(err => {
        const res = err.response.body
        const msg = 'This username is unavailable'
        if (res && res.errorType === 'USERNAME_UNAVAILABLE') {
          return dispatch(showError(msg))
        }
        dispatch(showError('An unexpected error has occurred.'))
      })
  }
}
