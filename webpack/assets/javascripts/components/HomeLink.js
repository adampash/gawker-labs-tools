import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'

let StyledLink = Radium(Link)

@Radium
export default class HomeLink extends React.Component {
  render() {
    let { to, text, description } = this.props
    return (
      <StyledLink to={ to } style={ styles.box }>
        <h4 style={ styles.header }>
          { text }
        </h4>
        <p style={ styles.description }>
          { description }
        </p>
      </StyledLink>
    )
  }
}

const styles = {
  box: {
    width: '31%',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 150,
    padding: 20,
    justifyContent: 'flex-start',
    margin: 10,
    flex: '1 0 250px',
    ':hover': {
      background: 'red',
      color: 'white'
    }
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 0,
  },
  description: {
    fontSize: 15
  }
}
