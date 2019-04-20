import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Header,
  Icon
} from 'semantic-ui-react'

const HeroSection = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Reka'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '0em' : '2em'
      }}
    />
    <Header
      as='h2'
      content='Enabling flavourful interactions'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Button primary size='huge'>
      Create your next event
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HeroSection.propTypes = {
  mobile: PropTypes.bool
}

export default HeroSection
