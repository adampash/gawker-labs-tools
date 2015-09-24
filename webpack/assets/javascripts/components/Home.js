import React from 'react'
import HomeLink from './HomeLink'

export default class Home extends React.Component {
  render() {
    return (
      <div style={ styles.container }>
        <HomeLink
          to="/embeds"
          text="Embeds"
          description="Converts unsupported Kinja embed code into supported Kinja embed code."
        />
        <HomeLink
          to="/gallery/new"
          text="Galleries"
          description="Make Kinja-friendly image galleries."
        />
        <HomeLink
          to="/suggestion/new"
          text="Suggestions?"
          description="Got something you'd like to see?"
        />
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'flex-wrap',
    justifyContent: 'space-between',
  }
}
