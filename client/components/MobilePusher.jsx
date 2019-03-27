import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Icon,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react'

const MobilePusher = props => {
  const { children, sidebarOpened, handleToggle } = props

  return (
    <Sidebar.Pusher dimmed={sidebarOpened}>
      <Segment
        vertical
        style={{ minHeight: 350, padding: '1em 0em' }}>
        <Container>
          <Menu pointing secondary size='large'>
            <Menu.Item onClick={() => handleToggle(true)}>
              <Icon name='sidebar' />
            </Menu.Item>
          </Menu>
        </Container>
        { children }
      </Segment>
    </Sidebar.Pusher>
  )
}

MobilePusher.propTypes = {
  children: PropTypes.node,
  sidebarOpened: PropTypes.bool,
  handleToggle: PropTypes.func
}

export default MobilePusher
