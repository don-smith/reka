import React from 'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal'
import InputMoment from 'input-moment'
import moment from 'moment'
import 'input-moment/dist/input-moment.css'

import {addNewEvent} from '../../actions/events'

class NewEvent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      description: '',
      dateTime: moment(),
      offeringType: 'wine',
      otherOfferingType: '',
      showingOtherOffering: false,
      showingDateTimeSelector: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateTimeSave = this.handleDateTimeSave.bind(this)
    this.handleDateTimeShow = this.handleDateTimeShow.bind(this)
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
    this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    const showOther = name === 'offeringType'
      ? value === 'other'
      : this.state.showingOtherOffering
    this.setState({
      [name]: value,
      showingOtherOffering: showOther
    })
  }

  handleDateTimeChange (m) {
    this.setState({m})
  }

  handleDateTimeSave () {
    this.setState({
      showingDateTimeSelector: false
    })
  }

  handleDateTimeShow (e) {
    this.setState({
      showingDateTimeSelector: true
    })
    e.preventDefault()
  }

  handleModalCloseRequest (e) {
    this.setState({
      showingDateTimeSelector: false
    })
  }

  handleSubmit (e) {
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

  render () {
    const dateTimeFormat = 'dddd, MMMM Do YYYY, h:mm a'
    return (
      <div className='new-event'>
        <form className='pure-form pure-form-stacked'>
          <fieldset>
            <legend>Create a new event</legend>

            <label htmlFor='name'>Name</label>
            <input id='name' name='name' onChange={this.handleChange}
              placeholder="Example: Jana's dark chocolate extravaganza"
              className='pure-input-1' />

            <label htmlFor='location'>Location</label>
            <input id='location' name='location' onChange={this.handleChange}
              placeholder='Example: 123 Tasty Lane'
              className='pure-input-1' />

            <label htmlFor='description'>Description</label>
            <textarea id='description' name='description' className='pure-input-1 h4'
              onChange={this.handleChange}
              placeholder={`Include what they should bring, suggestions on where they might purchase, if you have a sponsor (and who it is, where they are located, ect), and any information about your theme.`} />

            <label htmlFor='offeringType'>What will you be tasting?</label>
            <select id='offeringType' name='offeringType' onChange={this.handleChange}
              placeholder='Example: 123 Tasty Lane'
              className='pure-input-1'>
              <option value='wine'>Wine</option>
              <option value='beer'>Beer</option>
              <option value='chocolate'>Chocolate</option>
              <option value='other'>Other</option>
            </select>

            {this.state.showingOtherOffering &&
              <input name='otherOfferingType' onChange={this.handleChange}
                placeholder='What you will be tasting'
                className='pure-input-1' />
            }

            <label htmlFor='date'>Date and time</label>
            <div>
              <span className='b'>{this.state.dateTime.format(dateTimeFormat)}</span>{' '}
              <a href='#' onClick={this.handleDateTimeShow}>Change date/time</a>
            </div>
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
                onSave={this.handleDateTimeSave} />
            </ReactModal>

            <button className='pure-button pure-button-primary add-event-button'
              onClick={this.handleSubmit}>Add event</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({userDetails}) {
  // Set to zero until the userDetails are populated (like during a refresh)
  return {
    userId: userDetails ? userDetails.id : 0
  }
}

export default connect(mapStateToProps)(NewEvent)
