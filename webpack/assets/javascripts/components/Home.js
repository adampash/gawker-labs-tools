import React from 'react'

export default class Home extends React.Component {
  render() {
    return (
      <div style={ styles.container }>
        This is where all the content goes
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
