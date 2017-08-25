import request from '../lib/api'
import {showError, clearError} from './error'

export const REQUEST_ADD_EVENT = 'REQUEST_ADD_EVENT'
export const RECEIVE_ADD_EVENT = 'RECEIVE_ADD_EVENT'

const requestAddEvent = () => {
  return {
    type: REQUEST_ADD_EVENT
  }
}

const receiveAddEvent = () => {
  return {
    type: RECEIVE_ADD_EVENT
  }
}

export function addNewEvent (event) {
  return (dispatch) => {
    dispatch(requestAddEvent())
    request('post', '/events', event)
      .then(res => {
        dispatch(receiveAddEvent())
        dispatch(clearError())
      })
      .catch(() => {
        dispatch(showError('An unexpected error has occurred.'))
      })
  }
}
