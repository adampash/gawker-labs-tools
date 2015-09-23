import React from 'react'
import { Link } from 'react-router'

export default class Home extends React.Component {
  render() {
    return (
      <div style={ styles.container }>
        This is where all the content goes, okay?
        <div>
          <Link to="/embed/new">New embed</Link>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    maxWidth: 800,
    padding: 40,
    margin: '0 auto',
  }
}
