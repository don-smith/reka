import request from '../lib/api'
import {showError, clearError} from './error'

export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION'
export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION'

const requestRegistration = () => {
  return {
    type: REQUEST_REGISTRATION
  }
}

const receiveRegistration = () => {
  return {
    type: RECEIVE_REGISTRATION
  }
}

export function register (isRegistering, registration) {
  const {eventId, guestUserId: id, guestName: name} = registration
  const guest = {id, name}
  return (dispatch) => {
    dispatch(requestRegistration())
    if (isRegistering) {
      request('post', `/events/${eventId}/guests`, guest)
        .then(res => {
          dispatch(receiveRegistration())
          dispatch(clearError())
        })
        .catch(() => {
          dispatch(showError('An unexpected error has occurred.'))
        })
    } else {
      request('delete', `/events/${eventId}/guests`, guest)
        .then(res => {
          dispatch(receiveRegistration())
          dispatch(clearError())
        })
        .catch((err) => {
          dispatch(showError('An unexpected error has occurred.'))
        })
    }
  }
}
