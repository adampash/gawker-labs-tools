import React from 'react'
import { Link } from 'react-router'

export default class HomeLink extends React.Component {
  render() {
    console.log('hi')
    let { to, text } = this.props
    return (
      <Link to={ to } style={ styles.box }>
        <div>
          { text }
        </div>
      </Link>
    )
  }
}

const styles = {
  box: {
    width: '33.33%',
    background: 'white',
    display: 'flex',
  }
}
