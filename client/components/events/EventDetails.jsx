import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {register} from '../../actions/guests'
import {getEventDetails} from '../../actions/events'

class EventDetails extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {name: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.getEventDetails(this.props.match.params.id)
  }

  componentWillReceiveProps (nextProps) {
    // When the component mounts, we make an API call to get the event details,
    // which includes the guests. If the signed in user has registered, we need
    // to set the state with their name so they are able to unregister.
    if (nextProps.guests !== this.props.guests) {
      const guest = nextProps.guests.find(guest => {
        return guest.userId === this.props.userDetails.id
      })
      this.setState({name: (guest && guest.name) || ''})
    }
  }

  render () {
    const {eventDetails, guests, register, userDetails} = this.props
    const {name, description} = eventDetails
    const {id: userId, username} = userDetails || {}
    const dateTime = moment(eventDetails.dateTime)
    const date = dateTime.format('dddd, MMMM Do YYYY [at] hh:mm a')
    const isRegistrationOpen = dateTime.add(5, 'hours') > moment()
    const isRegistered = !!guests.find(guest => {
      return guest.userId === userId
    })
    const registration = {
      eventId: eventDetails.id,
      guestName: this.state.name,
      guestUserId: userId
    }
    return (
      <div className='event-details'>
        <h2>{name}</h2>
        <p>{description}</p>
        <div className='date'>{date}</div>
        <div className='location'>{eventDetails.location}</div>
        <div className='offering'>Tasting: {eventDetails.offeringType}</div>

        {isRegistrationOpen &&
          <div className='registration'>
            <h3>Registration</h3>
            {isRegistered
              ? <form className='pure-form'
                onSubmit={(e) => register(e, false, registration)}>
                <input type='submit' value='Unregister'
                  className='unregister pure-button pure-button' />
              </form>
              : <form className='pure-form'
                onSubmit={(e) => register(e, true, registration)}>
                <input name='name' value={this.state.name}
                  placeholder={`Name (e.g. ${username})`}
                  onChange={this.handleChange} /> {' '}
                <input type='submit' value='Register'
                  className='register pure-button pure-button' />
              </form>
            }
          </div>
        }

        <h3>Registered Guests</h3>
        <ul>
          {guests.map(guest => (
            <li key={guest.id}>
              <Link to={`/guests/${guest.id}`}>{guest.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
}

EventDetails.propTypes = {
  userDetails: PropTypes.object,
  getEventDetails: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  register: PropTypes.func,
  guests: PropTypes.array,
  eventDetails: PropTypes.object
}

function mapStateToProps ({activeEvent, userDetails}) {
  return {
    userDetails,
    guests: activeEvent.guests,
    eventDetails: activeEvent.details
  }
}

function mapDispatchToProps (dispatch) {
  return {
    register: (e, isRegistering, registration) => {
      e.preventDefault()
      dispatch(register(isRegistering, registration))
      dispatch(getEventDetails(registration.eventId))
    },
    getEventDetails: (id) => dispatch(getEventDetails(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
