import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import InputMoment from 'input-moment'
import moment from 'moment'
import 'input-moment/dist/input-moment.css'
import { Button, Form, Header } from 'semantic-ui-react'

import { addNewEvent } from '../../actions/events'
import ResponsiveContainer from '../ResponsiveContainer'

class NewEvent extends React.Component {
  state = {
    name: '',
    location: '',
    description: '',
    dateTime: moment(),
    offeringType: 'wine',
    otherOfferingType: '',
    showingOtherOffering: false,
    showingDateTimeSelector: false
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleOfferingChange = (e, { name, value }) => {
    const showOther = name === 'offeringType'
      ? value === 'other'
      : this.state.showingOtherOffering
    this.setState({
      [name]: value,
      showingOtherOffering: showOther
    })
  }

  handleDateTimeChange = m => {
    this.setState({ m })
  }

  handleDateTimeSave = () => {
    this.setState({
      showingDateTimeSelector: false
    })
  }

  handleDateTimeShow = e => {
    this.setState({
      showingDateTimeSelector: true
    })
    e.preventDefault()
  }

  handleModalCloseRequest = e => {
    this.setState({
      showingDateTimeSelector: false
    })
  }

  handleSubmit = e => {
    const {
      name, location, description, offeringType, otherOfferingType, dateTime
    } = this.state
    const newEvent = {
      name,
      location,
      description,
      userId: this.props.userId,
      dateTime: dateTime.valueOf(),
      offeringType: offeringType === 'other' ? otherOfferingType : offeringType
    }
    this.props.dispatch(addNewEvent(newEvent))
    e.preventDefault()
  }

  offeringTypes = [{
    key: 'wine',
    text: 'Wine',
    value: 'wine'
  }, {
    key: 'beer',
    text: 'Beer',
    value: 'beer'
  }, {
    key: 'chocolate',
    text: 'Chocolate',
    value: 'chocolate'
  }, {
    key: 'other',
    text: 'Other',
    value: 'other'
  }]

  render () {
    const dateTimeFormat = 'dddd, MMMM Do YYYY, h:mm a'
    return (
      <ResponsiveContainer>
        <div className='ui grid'>
          <Form size='large'>
            <div className='ui stacked'>
              <Header as='h2'>Create a new event</Header>

              <Form.Input id='name' label='Name' name='name'
                data-e2e='name' onChange={this.handleChange}
                placeholder="Example: Jana's dark chocolate extravaganza"
                className='pure-input-1' />

              <Form.Input id='location' label='Location' name='location'
                data-e2e='location' onChange={this.handleChange}
                placeholder='Example: 123 Tasty Lane'
                className='pure-input-1' />

              <Form.TextArea id='description' label='Description' name='description'
                data-e2e='description' onChange={this.handleChange}
                style={ { height: '12em' } }
                placeholder={`Include what they should bring, suggestions on where they might purchase items, if you have a sponsor (and who it is, where they are located, ect), and any information about your theme.`} />

              <Form.Dropdown id='offering-type' label='What will you be tasting?'
                data-e2e='offeringType' onChange={this.handleOfferingChange}
                name='offeringType' options={this.offeringTypes}
                placeholder='Your selection' />

              {this.state.showingOtherOffering &&
                <Form.Input name='otherOfferingType' onChange={this.handleChange}
                  placeholder='What you will be tasting?' />
              }

              <Form.Field>
                <label htmlFor='date'>Date and time</label>
                <div>
                  <div className='b'>{this.state.dateTime.format(dateTimeFormat)}</div>
                  <a href='#' onClick={this.handleDateTimeShow}>Change date/time</a>
                </div>
              </Form.Field>

              <ReactModal contentLabel='DateTime Modal'
                isOpen={this.state.showingDateTimeSelector}
                onRequestClose={this.handleModalCloseRequest}
                style={{
                  overlay: {
                    zIndex: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)'
                  },
                  content: {
                    top: '10%',
                    right: '20%',
                    bottom: '20%',
                    left: '20%'
                  }
                }}>
                <InputMoment moment={this.state.dateTime}
                  onChange={this.handleDateTimeChange}
                  onSave={this.handleDateTimeSave}
                  prevMonthIcon='arrow left icon'
                  nextMonthIcon='arrow right icon' />
              </ReactModal>

              <Button primary onClick={this.handleSubmit}>Add event</Button>
            </div>
          </Form>
        </div>
      </ResponsiveContainer>
    )
  }
}

NewEvent.propTypes = {
  userId: PropTypes.number,
  dispatch: PropTypes.func
}

function mapStateToProps ({ userDetails }) {
  // Set to zero until the userDetails are populated (like during a refresh)
  return {
    userId: userDetails ? userDetails.id : 0
  }
}

export default connect(mapStateToProps)(NewEvent)
