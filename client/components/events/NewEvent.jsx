import React from 'react'
import {connect} from 'react-redux'

import {addNewEvent} from '../../actions/events'

class NewEvent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      date: null,
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit () {
    this.props.dispatch(addNewEvent({...this.state}))
  }

  render () {
    return (
      <div className='new-event'>
        <form className='pure-form pure-form-stacked'>
          <fieldset>
            <legend>Create a new event</legend>

            <label htmlFor='name'>Name</label>
            <input id='name' name='name' placeholder='Name'
              onChange={this.handleChange} />

            <label htmlFor='date'>Date</label>
            <input id='date' name='date' placeholder='Date'
              onChange={this.handleChange} />

            <label htmlFor='description'>Description</label>
            <textarea id='description' name='description' placeholder='Description'
              onChange={this.handleChange} />

            <button className='pure-button pure-button-primary'
              onClick={this.handleSubmit}>Add event</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default connect()(NewEvent)
