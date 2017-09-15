import 'ignore-styles'
import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import App from '../../../client/components/App'

test('<App /> contains the router', t => {
  const expected = '<BrowserRouter />'
  const wrapper = shallow(<App />)
  t.is(wrapper.text(), expected)
})
