import { Component } from 'react'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'
import { approveGoal } from '../actions/goals'

export default class ApproveOrReject extends Component {
  approve() {
    let { goal, dispatch } = this.props
    console.log('approve', goal.id)

    dispatch(approveGoal(goal.id))
  }

  render() {
    let { approved, approved_by } = this.props.goal
    if (approved) {
      return (
        <div style={ styles.approved_message }>
          <FontAwesome name="check" style={{ color: "#66C14A" }} /> Approved by { approved_by.name }
        </div>
      )
    } else {
      return (
        <div style={ styles.buttons }>
          <button
            style={{ ...styles.approve, ...styles.button }}
            onClick={ this.approve.bind(this) }
          >
            Approve
          </button>
          <button style={{ ...styles.reject, ...styles.button }}>Reject</button>
        </div>
      )
    }
  }
}

const styles = {
  buttons: {
  },
  button: {
    marginRight: 20,
    outline: 'none',
    border: 'none',
    padding: 10,
    width: 80,
    color: 'white',
  },
  approve: {
    backgroundColor: '#40B11D',
  },
  reject: {
    backgroundColor: '#B70A0A',
  },
  approved_message: {
    fontSize: 13,
  },
}
