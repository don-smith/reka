import React from 'react'
import { render } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter as Router } from 'react-router'

import ErrorMessage from '../../../client/components/ErrorMessage'

test('<ErrorMessage /> shows message when supplied', () => {
  const errorMessage = 'test error message'
  const mockStore = configureStore()({ errorMessage })
  const wrapper = render(
    <Provider store={mockStore}>
      <Router><ErrorMessage /></Router>
    </Provider>
  )
  expect(wrapper.text()).toBe(errorMessage)
})

test('<ErrorMessage /> does not show message when not supplied', () => {
  const errorMessage = ''
  const mockStore = configureStore()({ errorMessage })
  const wrapper = render(
    <Provider store={mockStore}>
      <Router><ErrorMessage /></Router>
    </Provider>
  )
  expect(wrapper.text()).toBe(errorMessage)
})
