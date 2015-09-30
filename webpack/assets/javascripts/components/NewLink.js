import { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router'

export default class NewLink extends Component {
  render() {
    let { to, text } = this.props
    return (
      <Link to={ to } style={ styles.small }>
        <FontAwesome name="plus-circle" /> { text }
      </Link>
    )
  }
}

const styles = {
  small: {
    fontSize: 14,
    display: 'inline',
    marginLeft: 10,
  }
}
