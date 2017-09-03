import request from '../lib/api'
import {showError, clearError} from './error'

export const REQUEST_ADD_EVENT = 'REQUEST_ADD_EVENT'
export const RECEIVE_ADD_EVENT = 'RECEIVE_ADD_EVENT'
export const REQUEST_EVENT_LIST = 'REQUEST_EVENT_LIST'
export const RECEIVE_EVENT_LIST = 'RECEIVE_EVENT_LIST'
export const REQUEST_EVENT_DETAILS = 'REQUEST_EVENT_DETAILS'
export const RECEIVE_EVENT_DETAILS = 'RECEIVE_EVENT_DETAILS'

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

const requestEventList = () => {
  return {
    type: REQUEST_EVENT_LIST
  }
}

const receiveEventList = (events) => {
  return {
    type: RECEIVE_EVENT_LIST,
    events
  }
}

const requestEventDetails = () => {
  return {
    type: REQUEST_EVENT_DETAILS
  }
}

const receiveEventDetails = (event) => {
  return {
    type: RECEIVE_EVENT_DETAILS,
    event
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

export function getEventList () {
  return (dispatch) => {
    dispatch(requestEventList())
    request('get', '/events')
      .then(res => {
        dispatch(receiveEventList(res.body))
        dispatch(clearError())
      })
      .catch(() => {
        dispatch(showError('An unexpected error has occurred.'))
      })
  }
}

export function getEventDetails (id) {
  return (dispatch) => {
    dispatch(requestEventDetails())
    request('get', `/events/${id}`)
      .then(res => {
        dispatch(receiveEventDetails(res.body))
        dispatch(clearError())
      })
      .catch(() => {
        dispatch(showError('An unexpected error has occurred.'))
      })
  }
}
