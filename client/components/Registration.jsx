import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getEventDetails } from '../actions/events'

class Registration extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    // When the component mounts, check if we already have the eventDetails
    // and registrations. If we don't, we need to make an API call to get the
    // event details, which includes the registrations.
    if (!this.props.activeEvent.details) {
      this.props.getEventDetails(this.props.match.params.id)
    }

    // If the signed in user has registered, we need to set the state with
    // their name so they are able to unregister.
    const hostRegistration = this.props.activeEvent.registrations.find(registration => {
      const { userDetails } = this.props
      if (!userDetails) return false
      return registration.userId === userDetails.id
    })
    this.setState({ name: (hostRegistration && hostRegistration.name) || '' })
  }

  getActiveRegistration () {
    return this.props.activeEvent.registrations.find(reg => {
      return reg.id === Number(this.props.match.params.id)
    })
  }

  render () {
    const { activeEvent, userDetails } = this.props
    const registration = this.getActiveRegistration()

    return (
      <div data-e2e='registration' className='registration'>
        <h2>{registration && registration.name}</h2>
        <p>{activeEvent.description}</p>
        <p>{userDetails && userDetails.username}</p>
      </div>
    )
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
}

Registration.propTypes = {
  userDetails: PropTypes.object,
  getEventDetails: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  activeEvent: PropTypes.object
}

function mapStateToProps ({ activeEvent, userDetails }) {
  return {
    userDetails,
    activeEvent
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getEventDetails: (id) => dispatch(getEventDetails(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
