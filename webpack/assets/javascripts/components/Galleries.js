import React from 'react'
import { Link } from 'react-router'

export default class Galleries extends React.Component {
  renderChildren() {
    let { dispatch, galleries } = this.props
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { dispatch, galleries })
    })
  }

  render() {
    return (
      <div>
        <Link to="/galleries/new">
          + Create a new gallery
        </Link>
        { this.renderChildren() }
      </div>
    )
  }
}