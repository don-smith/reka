import React from 'react'
import {connect} from 'react-redux'

const BusyIndicator = (props) => {
  return (
    <div className='busy-indicator'>
      {
        props.waiting &&
        <img src='/animated-circle.gif' />
      }
    </div>
  )
}

function mapStateToProps ({busy}) {
  return {busy}
}

export default connect(mapStateToProps)(BusyIndicator)
