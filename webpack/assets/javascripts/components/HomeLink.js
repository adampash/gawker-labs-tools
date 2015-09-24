import React from 'react'
import { Link } from 'react-router'

export default class HomeLink extends React.Component {
  render() {
    console.log(styles)
    let { to, text, description } = this.props
    return (
      <Link to={ to } style={ styles.box }>
        <h4 style={ styles.header }>
          { text }
        </h4>
        <p style={ styles.description }>
          { description }
        </p>
      </Link>
    )
  }
}

const styles = {
  box: {
    maxWidth: '31%',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 150,
    padding: 20,
    // margin: '0px 5px',
    justifyContent: 'flex-start',
    // flex: '1 1'
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
