import request from '../lib/api'
import {showError} from './error'
import {saveAuthToken} from '../lib/auth'

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

export function register (newUser) {
  return (dispatch) => {
    dispatch(requestRegistration())
    request('post', '/auth/register', newUser)
      .then(res => {
        saveAuthToken(res.body.token)
        dispatch(receiveRegistration(res.body))
      })
      .catch(err => {
        const res = err.response.body
        const msg = 'This username is unavailable'
        if (res && res.errorType === 'USERNAME_UNAVAILABLE') {
          return dispatch(showError(msg))
        }
        dispatch(showError('An unknown error has occurred.'))
      })
  }
}
