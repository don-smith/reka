import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {clearError} from '../actions/error'

const ErrorMessage = (props) => {
  // TODO: Move this. It's creating a new event handler during each render.
  props.history.listen(() => {
    props.dispatch(clearError())
  })
  return (
    <div className='error'>
      {props.errorMessage}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    errorMessage: state.errorMessage
  }
}

export default withRouter(
  connect(mapStateToProps)(ErrorMessage)
)
