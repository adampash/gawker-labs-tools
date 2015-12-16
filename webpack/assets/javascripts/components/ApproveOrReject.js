import { Component } from 'react'
import Radium from 'radium'

export default class ApproveOrReject extends Component {
  render() {
    let { approved, approved_by } = this.props
    if (approved) {
      return <div>Approved</div>
    } else {
      return (
        <div style={ styles.buttons }>
          <button style={{ ...styles.approve, ...styles.button }}>Approve</button>
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
}
