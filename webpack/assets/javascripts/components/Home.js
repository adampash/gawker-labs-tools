import React from 'react'
import Radium from 'radium'
import HomeLink from './HomeLink'

@Radium
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
          to="/galleries"
          text="Galleries"
          description="Make Kinja-friendly image galleries."
        />
        <HomeLink
          to="/styles"
          text="Styles"
          description="Add a rule to the Gawker Media Style Guide"
        />
        <HomeLink
          to="/suggestions/new"
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
    flexWrap: 'wrap',
  }
}
