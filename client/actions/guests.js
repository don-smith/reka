import request from '../lib/api'
import {showError, clearError} from './error'

export const REQUEST_EVENT_REGISTRATION = 'REQUEST_EVENT_REGISTRATION'
export const RECEIVE_EVENT_REGISTRATION = 'RECEIVE_EVENT_REGISTRATION'

const requestRegistration = () => {
  return {
    type: REQUEST_EVENT_REGISTRATION
  }
}

const receiveRegistration = () => {
  return {
    type: RECEIVE_EVENT_REGISTRATION
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
