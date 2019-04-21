import React from 'react'
import PropTypes from 'prop-types'

class AllRoutes extends React.Component {
  componentDidMount () {
    // Reset scroll position on forward navigation
    this.props.history.listen((_, action) => {
      if (action === 'PUSH') window.scroll(0, 0)
    })
  }
  render () { return null }
}

AllRoutes.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func
  })
}

export default AllRoutes
