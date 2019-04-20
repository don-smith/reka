import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Segment, Sidebar, Responsive } from 'semantic-ui-react'

import MobileMenu from './MobileMenu'
import MobilePusher from './MobilePusher'
import DesktopMenu from './DesktopMenu'

const getWidth = () => window.innerWidth

const ResponsiveContainer = ({ children }) => {
  const [sidebarOpened, handleToggle] = useState(false)

  return (
    <div>
      <Responsive
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}>
        <DesktopMenu fixed />
        <Segment style={ { padding: '8em 3em' } } vertical>
          {children}
        </Segment>
      </Responsive>
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}>
        <MobileMenu
          sidebarOpened={sidebarOpened}
          handleToggle={handleToggle} />
        <MobilePusher
          sidebarOpened={sidebarOpened}
          handleToggle={handleToggle}>
          <Segment style={ { padding: '3em 3em' } } vertical>
            {children}
          </Segment>
        </MobilePusher>
      </Responsive>
    </div>
  )
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

export default ResponsiveContainer
