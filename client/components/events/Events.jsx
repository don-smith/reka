import React from 'react'
import {Route} from 'react-router-dom'

import NewEvent from './NewEvent'

const Events = () => {
  return (
    <div className='events'>
      <div className='page-content-wrapper'>
        <div className='content'>
          <Route path='/events/new' component={NewEvent} />
        </div>
      </div>
    </div>
  )
}

export default Events
