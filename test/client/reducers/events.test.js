import test from 'ava'

import {
  REQUEST_EVENT_LIST,
  RECEIVE_EVENT_LIST
} from '../../../client/actions/events'
import events from '../../../client/reducers/events'

test('events returns the event during RECEIVE_EVENT_LIST', t => {
  const currentState = {}
  const action = {
    type: RECEIVE_EVENT_LIST,
    events: {
      hosted: [{name: 'test hosted event'}],
      attended: [{name: 'test attended event'}]
    }
  }
  const newState = events(currentState, action)
  t.is(newState.hosted[0], action.events.hosted[0])
  t.is(newState.attended[0], action.events.attended[0])
})

test('events returns the initial state during REQUEST_EVENT_LIST', t => {
  const currentState = {
    hosted: [{name: 'test hosted event'}],
    attended: [{name: 'test attended event'}]
  }
  const action = {
    type: REQUEST_EVENT_LIST
  }
  const newState = events(currentState, action)
  t.is(newState.hosted.length, 0)
  t.is(newState.attended.length, 0)
})

test('activeEvent returns the current state by default', t => {
  const currentState = {
    details: {},
    guests: ['test guest']
  }
  const action = {
    type: 'UNKNOWN_ACTION_TYPE'
  }
  const newState = events(currentState, action)
  t.is(newState.guests.length, 1)
})
