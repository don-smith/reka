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
      description: '',
      dateTime: moment(),
      showingDateTimeSelector: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateTimeSave = this.handleDateTimeSave.bind(this)
    this.handleDateTimeShow = this.handleDateTimeShow.bind(this)
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
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

  handleSubmit (e) {
    this.props.dispatch(addNewEvent({...this.state}))
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

            <label htmlFor='description'>Description</label>
            <textarea id='description' name='description' className='pure-input-1 h4'
              onChange={this.handleChange}
              placeholder={`Include what they should bring, suggestions on where they might purchase, if you have a sponsor (and who it is, where they are located, ect), and any information about your theme.`} />

            <label htmlFor='date'>Date and time</label>
            <div>
              <span className='b'>{this.state.dateTime.format(dateTimeFormat)}</span>{' '}
              <a href='#' onClick={this.handleDateTimeShow}>Change date/time</a>
            </div>
            <ReactModal isOpen={this.state.showingDateTimeSelector}>
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

export default connect()(NewEvent)
