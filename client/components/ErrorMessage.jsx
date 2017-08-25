import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {clearError} from '../actions/error'

class ErrorMessage extends React.Component {
  constructor (props) {
    super(props)

    props.history.listen(() => {
      props.dispatch(clearError())
    })
  }

  render () {
    return (
      <div className='red error pl3'>
        {this.props.errorMessage}
      </div>
    )
  }
}

function mapStateToProps ({errorMessage}) {
  return {errorMessage}
}

export default withRouter(
  connect(mapStateToProps)(ErrorMessage)
)
