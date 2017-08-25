import React from 'react'
import {connect} from 'react-redux'

const WaitIndicator = (props) => {
  return (
    <div className='wait-indicator'>
      {
        props.waiting &&
        <img src='/animated-circle.gif' />
      }
    </div>
  )
}

function mapStateToProps ({waiting}) {
  return {waiting}
}

export default connect(mapStateToProps)(WaitIndicator)
