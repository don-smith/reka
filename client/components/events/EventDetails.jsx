import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Header } from 'semantic-ui-react'

import { register } from '../../actions/registrations'
import { getEventDetails } from '../../actions/events'
import ResponsiveContainer from '../ResponsiveContainer'

class EventDetails extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { name: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount (prevProps) {
    // When the component mounts, we make an API call to get the event details,
    // which includes the registrations.
    this.props.getEventDetails(Number(this.props.match.params.id))

    // If the signed in user has registered, we need to set the state with
    // their name so they are able to unregister.
    const hostRegistration = this.props.registrations.find(registration => {
      return registration.userId === this.props.userDetails.id
    })
    this.setState({ name: (hostRegistration && hostRegistration.name) || '' })
  }

  render () {
    const { eventDetails, registrations, register, userDetails } = this.props
    const { name, description } = eventDetails
    const { id: userId, username } = userDetails || {}
    const dateTime = moment(eventDetails.dateTime)
    const date = dateTime.format('dddd, MMMM Do YYYY [at] hh:mm a')
    const isRegistrationOpen = dateTime.add(5, 'hours') > moment()
    const isRegistered = !!registrations.find(registration => {
      return registration.userId === userId
    })
    const registration = {
      eventId: eventDetails.id,
      registrationUserId: userId,
      registrationName: this.state.name
    }
    return (
      <ResponsiveContainer>
        <div className='event-details'>
          <Header as='h2'>{name}</Header>
          <p>{description}</p>
          <div className='date'>{date}</div>
          <div className='location'>{eventDetails.location}</div>
          <div className='offering'>Tasting: {eventDetails.offeringType}</div>

          {isRegistrationOpen &&
            <React.Fragment>
              <Header as='h3'>Registration</Header>
              {isRegistered
                ? <Form className='unregister'
                  onSubmit={(e) => register(e, false, registration)}>
                  <Button type='submit'>Unregister</Button>
                </Form>
                : <Form className='register'
                  onSubmit={(e) => register(e, true, registration)}>
                  <Form.Input name='name' value={this.state.name}
                    placeholder={`Name (e.g. ${username})`} label='Name'
                    onChange={this.handleChange} /> {' '}
                  <Button type='submit'>Register</Button>
                </Form>
              }
            </React.Fragment>
          }

          <Header as='h3'>Registered Guests</Header>
          <ul className='guests'>
            {registrations.map(registration => (
              <li key={registration.id}>
                <Link to={`/registrations/${registration.id}`}>{registration.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </ResponsiveContainer>
    )
  }

  handleChange (e) {
    const { name, value } = e.target
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
  registrations: PropTypes.array,
  eventDetails: PropTypes.object
}

function mapStateToProps ({ activeEvent, userDetails }) {
  return {
    userDetails,
    eventDetails: activeEvent.details || {},
    registrations: activeEvent.registrations
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
