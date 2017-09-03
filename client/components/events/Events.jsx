import React from 'react'
import {Route} from 'react-router-dom'

import NewEvent from './NewEvent'
import EventList from './EventList'

const Events = () => {
  return (
    <div className='events'>
      <div className='page-content-wrapper'>
        <div className='content'>
          <Route exact path='/events' component={EventList} />
          <Route exact path='/events/new' component={NewEvent} />
        </div>
      </div>
    </div>
  )
}

export default Events
