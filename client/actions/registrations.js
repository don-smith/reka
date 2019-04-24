import { callApi } from '../api'
import { showError, clearError } from './error'

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
  const { eventId, registrationUserId: id, registrationName: name } = registration
  const payload = { id, name }
  return (dispatch) => {
    dispatch(requestRegistration())
    if (isRegistering) {
      return callApi('post', `/events/${eventId}/registrations`, payload)
        .then(() => {
          dispatch(receiveRegistration())
          dispatch(clearError())
        })
        .catch(() => {
          dispatch(showError('An unexpected error has occurred.'))
        })
    } else {
      return callApi('delete', `/events/${eventId}/registrations`, payload)
        .then(() => {
          dispatch(receiveRegistration())
          dispatch(clearError())
        })
        .catch(() => {
          dispatch(showError('An unexpected error has occurred.'))
        })
    }
  }
}
