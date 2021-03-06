import React from 'react'
import Radium from 'radium'
import HomeLink from './HomeLink'

@Radium
export default class Home extends React.Component {
  render() {
    let { currentUser } = this.props
    let goalsUrl
    if (currentUser.manager) {
      goalsUrl = "/sites/goals"
    } else {
      goalsUrl = `/sites/${currentUser.site}/quarters`
    }
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
          to="/related"
          text="Related widget"
          description="Make a related widget wow!"
        />
        <HomeLink
          to="/liveblog"
          text="Liveblog"
          description="How to set up a liveblog"
        />
        <HomeLink
          to="/styles"
          text="Styles"
          description="Add a rule to the Gawker Media Style Guide"
        />
        { (currentUser.editor || currentUser.manager) &&
          <HomeLink
            to={ goalsUrl }
            text="Goals"
            description="Create and view goals for your site"
          />
        }
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
