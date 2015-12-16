import { Component } from 'react'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'

@Radium
export default class TitleRow extends Component {
  render() {
    let { suggestion, select } = this.props
    if (suggestion !== null) {
      return (
        <div style={ styles.container }
          onClick={ (e) => select(suggestion) }
        >
          { suggestion.name }
        </div>
      )
    } else {
      return (
        <div style={ styles.container } >
          Create new title
        </div>
      )
    }
  }
}

const styles = {
  container: {
    cursor: 'pointer',
    display: 'flex',
    padding: '5px 10px',
    alignItems: 'center',
    ':hover': {
      background: '#ccc'
    }
  },
}

