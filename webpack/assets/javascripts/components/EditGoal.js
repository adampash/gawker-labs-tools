import React from 'react'
import Radium from 'radium'
import { getGoalAsync, updateGoalAsync } from '../actions/goals'
import { connect } from 'react-redux'
import GoalForm from './GoalForm'

@Radium
class EditGoal extends React.Component {
  componentWillMount() {
    let { routeParams, dispatch } = this.props
    let { goalId } = routeParams

    dispatch(getGoalAsync(goalId))
  }

  componentWillReceiveProps(nextProps) {
    let { goal } = nextProps
    this.setState({
      ...goal
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let { siteName, quarter, goalId } = this.props.params
    if (!this.isFormEnabled()) {
      return alert("You need to fill out this form.")
    }
    let { dispatch, history } = this.props
    console.log(this.state)
    dispatch(updateGoalAsync({
      ...this.state,
      siteName,
      quarter,
      goalId,
    }, history))
  }

  handleNameChange(e) {
    let { value, name } = e.target
    this.setState({
      [name]: value
    })
    if (e.person) {
      this.setState({ person: e.person })
    }
    if (e.title) {
      this.setState({ title: e.title })
    }
  }

  isFormEnabled() {
    let { name } = this.state
    return name !== ''
  }

  render() {
    let { params, goal } = this.props
    if (goal) {
      return (
        <div style={ styles.container }>
          <form style={ styles.form } onSubmit={ this.handleSubmit.bind(this) }>
            <GoalForm
              handleChange={ this.handleNameChange.bind(this) }
              params={ params }
              goal={ goal }
              type="edit"
            />
            <button
              type="submit"
              style={[ styles.button, !this.isFormEnabled() && styles.disabled ]}
              disabled={ !this.isFormEnabled() }
            >
              Update goal
            </button>
          </form>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
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
  let { goals, router, currentUser } = state
  let { goalId } = router.params
  let goal = goals.find( goal => {
    return goal.id === parseInt(goalId)
  })
  return {
    goal,
    currentUser,
  }
}

export default connect(select)(EditGoal)
