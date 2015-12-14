import { Component } from 'react'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'

@Radium
export default class GoalRow extends Component {
  render() {
    let { goal } = this.props
    let { person } = goal
    return (
      <div style={ styles.container }>
        <img src={ person.avatar } style={ styles.avatar } />
        <div style={ styles.name }>{ person.name }</div>
        <div style={ styles.goal } >
          This is a goal.
        </div>
        { goal.approved &&
          <span>
            <FontAwesome name="check" />
            Approved
          </span>
        }
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 5,
    cursor: 'pointer',
    ':hover': {
      background: 'white',
    },
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 2,
    marginRight: 10,
  },
  goal: {
    flex: '1 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: 10,
  },
  name: {
    flex: '0 1 130px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: 10,
  },
  approved: {
    flex: '0 1',
  },
}
