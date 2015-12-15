import { Component } from 'react'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'

@Radium
export default class GoalRow extends Component {
  render() {
    let { goal, currentUser } = this.props
    let { person } = goal
    return (
      <div style={ styles.container }>
        <img src={ person.avatar } style={ styles.avatar } />
        <div style={ styles.name }>{ person.name }</div>
        <div style={ styles.goal } >
          { goal.goals }
        </div>
        { currentUser.editor && !goal.approved &&
          <span>
            &nbsp;<FontAwesome name="pencil" />
          </span>
        }
        { goal.approved &&
          <span>
            <FontAwesome name="check" style={{ color: "#66C14A" }} />
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
    padding: '10px 5px',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    ':hover': {
      background: 'white',
    },
  },
  avatar: {
    width: 25,
    height: 25,
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
