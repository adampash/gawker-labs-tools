import React, { Component } from 'react'
import { Link } from 'react-router'
import { dispatch, connect } from 'react-redux'

class Embeds extends Component {
  renderChildren() {
    let { dispatch, embeds } = this.props
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { dispatch, embeds })
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

function select(state) {
  let { embeds } = state
  return {
    embeds
  }
}

export default connect(select)(Embeds)
