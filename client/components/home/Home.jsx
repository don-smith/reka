import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Sidebar, Container, Header, Responsive } from 'semantic-ui-react'

import DesktopHero from './DesktopHero'
import MobileHero from './MobileHero'
import HeroSection from './HeroSection'
import DesktopMenu from '../DesktopMenu'
import MobileMenu from '../MobileMenu'

const getWidth = () => window.innerWidth

const Home = () => {
  const HomeContent = () => (
    <Segment style={ { padding: '3em 0em' } }vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          What we mean by <em>flavourful interactions</em>
        </Header>
        <p>Reka helps you manage tasting events. Tasting events are heaps of fun to organise and participate in. They are a great opportunity to meet new people and enjoy the company of friends, all while experiencing new sensations of taste and smell. Some themes you might consider are: wine, beer, chocolate, cheese and soup, but the list is long.</p>
        <p>Specifically, Reka helps you manage blind tastings. That way your guests won&apos;t be influenced by personal biases, labels, prices or who brought the sample when they cast their votes and opinions. Reka makes these events easy by providing:</p>
        <ul>
          <li>A home page for your event</li>
          <li>Guest registration</li>
          <li>Registration of samples/offerings brought by your guests</li>
          <li>A registry so guests can see ahead of time what others are brining</li>
          <li>A voting platform to use during the event</li>
          <li>Control when the results are available</li>
        </ul>
        <p><Link to='/events/new'>Register your next event now</Link></p>
        <p>Reka means <a href='http://maoridictionary.co.nz/search?keywords=reka' target='_blank' rel="noopener noreferrer">pleasing, tasty, and flavour</a> in Maori.</p>
      </Container>
    </Segment>
  )

  const [sidebarOpened, handleToggle] = useState(false)

  return (
    <div>
      <Responsive
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}>
        <DesktopHero>
          <DesktopMenu />
          <HeroSection />
        </DesktopHero>
        <HomeContent />
      </Responsive>
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}>
        <MobileMenu inverted
          sidebarOpened={sidebarOpened}
          handleToggle={handleToggle} />
        <MobileHero sidebarOpened={sidebarOpened} handleToggle={handleToggle}>
          <HeroSection mobile />
          <HomeContent />
        </MobileHero>
      </Responsive>
    </div>
  )
}

Home.propTypes = {}

export default Home
