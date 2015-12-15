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
        <img src={ person.avatar } style={ styles.avatar } />
        { person.name }
      </div>
    )
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
  avatar: {
    width: 30,
    marginRight: 10,
    borderRadius: 2,
  },
}
