import React from 'react'
import { Link } from 'react-router'

export default class Embeds extends React.Component {
  render() {
    return (
      <div>
        <Link to="/embeds/new">
          + Create a new embed
        </Link>
        { this.props.children }
      </div>
    )
  }
}

