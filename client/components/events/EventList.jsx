import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {getEventList} from '../../actions/events'

class EventList extends React.PureComponent {
  componentDidMount () {
    this.props.dispatch(getEventList())
  }

  render () {
    const noneHostedMessage = (
      <p>
        You haven't hosted any events yet. Would you like to {' '}
        <Link to='/events/new'>host one now</Link>?
      </p>
    )
    const noneAttendedMessage = <p>You haven't attended any events yet.</p>

    return (
      <div className='event-list'>
        <div className='new'>
          <Link to='/events/new' className='pure-button'>
            Host a new event
          </Link>
        </div>
        <div className='hosted'>
          <h2>Events I've hosted</h2>
          {this.getEvents(this.props.events.hosted, noneHostedMessage)}
        </div>
        <div className='attended'>
          <h2>Events I've attended</h2>
          {this.getEvents(this.props.events.attended, noneAttendedMessage)}
        </div>
      </div>
    )
  }

  getEvents (events = [], noneMessage) {
    const hasEvents = !!events.length
    const eventList = this.formatList(events)
    return hasEvents ? eventList : noneMessage
  }

  formatList (events) {
    return (
      <ul>
        {events.map(event => (
          <li><Link to={`/events/${event.id}`}>{event.name}</Link></li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps ({events}) {
  return {events}
}

export default connect(mapStateToProps)(EventList)
