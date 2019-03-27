import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Segment, Container, Header, Responsive, Sidebar } from 'semantic-ui-react'

import { getEventList } from '../../actions/events'

import DesktopMenu from '../DesktopMenu'
import MobileMenu from '../MobileMenu'
import MobilePusher from '../MobilePusher'

class EventList extends React.PureComponent {
  state = { sidebarOpened: false }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  componentDidMount () {
    this.props.getEventList()
  }

  render () {
    const { sidebarOpened } = this.state
    const getWidth = () => window.innerWidth
    const { upcoming, hosted, attended } = this.props.events

    const noneUpcomingMessage = <p>You don&apos;t have any upcoming events.</p>
    const noneHostedMessage = (
      <p>
        You haven&apos;t hosted any events yet. Would you like to {' '}
        <Link to='/events/new'>host one now</Link>?
      </p>
    )
    const noneAttendedMessage = <p>You haven&apos;t attended any events yet.</p>

    const EventListContent = () => (
      <Container text>
        <Header as='h1'>Events</Header>
        <Button as={Link} to='/events/new'>Host a new event</Button>

        <Segment vertical style={ { padding: '1em 0em' } }>
          <div id='upcoming'>
            <h2>My upcoming events</h2>
            {this.getEvents(upcoming, noneUpcomingMessage)}
          </div>
          <div id='hosted'>
            <h2>Events I&apos;ve hosted</h2>
            {this.getEvents(hosted, noneHostedMessage)}
          </div>
          <div id='attended'>
            <h2>Events I&apos;ve attended</h2>
            {this.getEvents(attended, noneAttendedMessage)}
          </div>
        </Segment>
      </Container>
    )

    return (
      <div>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}>
          <DesktopMenu fixed />
          <Segment style={ { padding: '8em 3em' } } vertical>
            <EventListContent />
          </Segment>
        </Responsive>
        <Responsive
          as={Sidebar.Pushable}
          getWidth={getWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}>
          <MobileMenu
            sidebarOpened={sidebarOpened}
            handleToggle={this.handleToggle} />
          <MobilePusher
            sidebarOpened={sidebarOpened}
            handleToggle={this.handleToggle}>
            <Segment style={ { padding: '3em 3em' } } vertical>
              <EventListContent />
            </Segment>
          </MobilePusher>
        </Responsive>
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
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

EventList.propTypes = {
  getEventList: PropTypes.func,
  events: PropTypes.shape({
    upcoming: PropTypes.array,
    hosted: PropTypes.array,
    attended: PropTypes.array
  })
}

function mapStateToProps ({ events }) {
  return { events }
}

function mapDispatchToProps (dispatch) {
  return {
    getEventList: () => dispatch(getEventList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList)
