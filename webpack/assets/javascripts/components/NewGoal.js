import React from 'react'
import Radium from 'radium'
import { createGoal } from '../actions/goals'
import { connect } from 'react-redux'
import GoalForm from './GoalForm'

@Radium
class NewGoal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      title: '',
      goals: '',
      otherGoals: '',
      person: {},
    }
  }

  onComponentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault()
    let { siteName, quarter } = this.props.params
    if (!this.isFormEnabled()) {
      return alert("Your style needs both files and a name")
    }
    let { dispatch, history } = this.props
    dispatch(createGoal({
      ...this.state,
      siteName,
      quarter
    }, history))
  }

  handleNameChange(e) {
    let { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  isFormEnabled() {
    let { name } = this.state
    return name !== ''
  }

  render() {
    return (
      <div style={ styles.container }>
        <form style={ styles.form } onSubmit={ this.handleSubmit.bind(this) }>
          <GoalForm handleChange={ this.handleNameChange.bind(this) } />
          <button
            type="submit"
            style={[ styles.button, !this.isFormEnabled() && styles.disabled ]}
            disabled={ !this.isFormEnabled() }
          >
            Create goal
          </button>
        </form>
      </div>
    )
  }
}

const styles = {
  container: {
    maxWidth: 636,
    width: '100%',
    margin: '20px auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '0px 20px',
  },
  input: {
    fontSize: 16,
    padding: 5,
    marginBottom: 20,
    outline: 'none'
  },
  button: {
    padding: 10,
    outline: 'none',
    background: 'red',
    border: 'none',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer'
  },
  disabled: {
    opacity: 0.5,
  },
  drop_message: {
    padding: 10,
  },
  topRow: {
    display: 'flex'
  }
}


function select(state) {
  let { pictures } = state
  return {
    pictures
  }
}

export default connect(select)(NewGoal)

