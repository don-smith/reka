import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {getEventDetails} from '../../actions/events'

class EventDetails extends React.PureComponent {
  componentDidMount () {
    const id = this.props.match.params.id
    this.props.dispatch(getEventDetails(id))
  }

  render () {
    const {details, guests} = this.props.activeEvent
    const {name, description} = details
    return (
      <div className='event-details'>
        <h2>{name}</h2>
        <p>{description}</p>
        <h3>Guests</h3>
        <ul>
          {guests.map(guest => (
            <li><Link to={`/guests/${guest.id}`}>{guest.name}</Link></li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({activeEvent}) {
  return {activeEvent}
}

export default connect(mapStateToProps)(EventDetails)
