import React from 'react'
import {Route} from 'react-router-dom'

import NewEvent from './NewEvent'
import EventList from './EventList'
import EventDetails from './EventDetails'

const Events = () => {
  return (
    <div className='events'>
      <div className='page-content-wrapper'>
        <div className='content'>
          <Route exact path='/events' component={EventList} />
          <Route exact path='/events/new' component={NewEvent} />
          <Route exact path='/events/:id' component={EventDetails} />
        </div>
      </div>
    </div>
  )
}

export default Events
