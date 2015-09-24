import React from 'react'
import HomeLink from './HomeLink'

export default class Home extends React.Component {
  render() {
    return (
      <div style={ styles.container }>
        <HomeLink to="/embed/new" text="Embeds" />
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'flex-wrap',
  }
}
