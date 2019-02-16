import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NewEvent from './NewEvent'
import EventList from './EventList'
import EventDetails from './EventDetails'

const Events = () => {
  return (
    <div className='events'>
      <div className='page-content-wrapper'>
        <div className='content'>
          <Switch>
            <Route exact path='/events' component={EventList} />
            <Route path='/events/new' component={NewEvent} />
            <Route path='/events/:id' component={EventDetails} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Events
