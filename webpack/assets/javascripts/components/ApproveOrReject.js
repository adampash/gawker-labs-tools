import { Component } from 'react'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'
import { approveGoal, rejectGoal } from '../actions/goals'

@Radium
export default class ApproveOrReject extends Component {
  constructor(props) {
    super(props)
    this.state = { rejecting: false }
  }
  approve() {
    let { goal, dispatch } = this.props
    dispatch(approveGoal(goal.id))
  }

  showRejectMessage() {
    let { rejecting } = this.state
    if (rejecting) {
      let { goal, dispatch } = this.props
      let message = this.refs.reject_message.value

      dispatch(rejectGoal({ id: goal.id, message }))
      this.setState({ rejecting: false })
    } else {
      this.setState({ rejecting: true }, () => {
        this.refs.reject_message.focus()
      })
    }
  }

  render() {
    let { approved, approved_by, reject_message } = this.props.goal
    let { rejecting } = this.state
    if (approved) {
      return (
        <div style={ styles.approved_message }>
          <FontAwesome name="check" style={{ color: "#66C14A" }} /> Approved by { approved_by.name }
        </div>
      )
    } else {
      return (
        <div>
          { reject_message &&
            <p>
              <b>Needed for approval:</b> { reject_message }
            </p>
          }
          <div style={ styles.buttons }>
            <button ref="approve"
              style={{ ...styles.approve, ...styles.button }}
              onClick={ this.approve.bind(this) }
            >
              Approve
            </button>
            { rejecting &&
              <textarea ref="reject_message"
                placeholder="What needs to be changed to get this goal approved?"
                style={ styles.reject_message }
              />
            }
              <button ref="reject"
                style={{ ...styles.reject, ...styles.button }}
                onClick={ this.showRejectMessage.bind(this) }
              >
                Reject
              </button>
          </div>
        </div>
      )
    }
  }
}

const styles = {
  buttons: {
    display: 'flex',
    marginTop: 20,
  },
  button: {
    marginRight: 20,
    fontSize: 13,
    outline: 'none',
    border: 'none',
    padding: 10,
    width: 80,
    color: 'white',
    cursor: 'pointer',
    opacity: 0.8,
    ':hover': {
      opacity: 1,
    }
  },
  approve: {
    backgroundColor: '#40B11D',
  },
  reject: {
    backgroundColor: '#B70A0A',
  },
  approved_message: {
    fontSize: 13,
    marginTop: 20,
  },
  reject_message: {
    width: '80%',
    maxWidth: 300,
    padding: 5,
    outline: 'none',
  },
}
