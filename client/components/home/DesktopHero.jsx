import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Visibility } from 'semantic-ui-react'

class Hero extends React.Component {
  render () {
    const { children } = this.props

    return (
      <Visibility
        once={false}
        onBottomPassed={this.showFixedMenu}
        onBottomPassedReverse={this.hideFixedMenu}>
        <Segment
          vertical inverted
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em' }}>
          { children }
        </Segment>
      </Visibility>
    )
  }
}

Hero.propTypes = {
  children: PropTypes.node,
  fixed: PropTypes.bool,
  logOff: PropTypes.func,
  signedIn: PropTypes.bool,
  atHome: PropTypes.bool,
  atEvents: PropTypes.bool,
  atProfile: PropTypes.bool
}

export default Hero
