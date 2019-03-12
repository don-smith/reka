import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Icon,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react'

const MobileHero = props => {
  const { children, sidebarOpened, handleToggle } = props

  return (
    <Sidebar.Pusher dimmed={sidebarOpened}>
      <Segment
        vertical inverted
        textAlign='center'
        style={{ minHeight: 350, padding: '1em 0em' }}>
        <Container>
          <Menu inverted pointing secondary size='large'>
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

MobileHero.propTypes = {
  children: PropTypes.node,
  sidebarOpened: PropTypes.bool,
  handleToggle: PropTypes.func
}

export default MobileHero
