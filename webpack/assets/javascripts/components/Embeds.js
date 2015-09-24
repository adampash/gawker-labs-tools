import React from 'react'
import { Link } from 'react-router'

export default class Embeds extends React.Component {
  renderChildren() {
    let { dispatch } = this.props
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { dispatch })
    })
  }

  render() {
    return (
      <div>
        <Link to="/embeds/new">
          + Create a new embed
        </Link>
        { this.renderChildren() }
      </div>
    )
  }
}

