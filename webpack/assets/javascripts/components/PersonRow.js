import { Component } from 'react'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'

@Radium
export default class PersonRow extends Component {
  render() {
    let { person, select } = this.props
    return (
      <div style={ styles.container }
        onClick={ (e) => select(person) }
      >
        { person.name }
      </div>
    )
  }
}

const styles = {
  container: {
    cursor: 'pointer',
  },
}
