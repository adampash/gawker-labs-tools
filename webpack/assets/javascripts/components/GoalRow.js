import { Component } from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'

@Radium
export default class GoalRow extends Component {
  render() {
    let { goal, currentUser, siteName } = this.props
    let { person } = goal
    return (
        <div style={ styles.container }>
          <Link to={ `/sites/gawker/goals/${goal.id}` } >
            <img src={ person.avatar } style={ styles.avatar } />
          </Link>
          <Link to={ `/sites/gawker/goals/${goal.id}` }
            style={ styles.name}
          >
            { person.name }
          </Link>
          <Link to={ `/sites/gawker/goals/${goal.id}` } style={ styles.goal} >
              { goal.goals }
          </Link>
          { currentUser.editor && !goal.approved &&
            <span>
              <Link to={ `/sites/${siteName}/goals/${goal.id}/edit` } goal={ goal }>
                &nbsp;<FontAwesome name="pencil" />
              </Link>
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
    fontSize: '13px',
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
