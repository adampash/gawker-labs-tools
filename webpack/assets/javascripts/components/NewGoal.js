import React from 'react'
import Radium from 'radium'
import { createGoal } from '../actions/goals'
import { connect } from 'react-redux'
import GoalForm from './GoalForm'
import Network from '../Network'

@Radium
class NewGoal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      title_name: '',
      goals: '',
      other_goals: '',
      person: {},
    }
  }

  componentWillMount() {
    let { params, quarters } = this.props
    let { quarter: quarter_id } = params
    let quarter = quarters.find( quarter => {
      return quarter.q_id === parseInt(quarter_id)
    })
    this.setState({ quarter })
  }

  handleSubmit(e) {
    e.preventDefault()
    let { siteName, quarter } = this.props.params
    if (!this.isFormEnabled()) {
      return alert("You need to fill out this form.")
    }
    let { dispatch, history } = this.props
    dispatch(createGoal({
      ...this.state,
      siteName,
      quarter
    }, history))
  }

  getPrevGoal() {
    let { quarter, person } = this.state
    Network.get(`users/${person.id}/prev_quarter/${quarter.id}`)
      .then(response => {
        return response.json()
      })
      .then(prevGoal => {
        console.log(prevGoal)
        this.setState({ prevGoal })
      })
  }

  handleNameChange(e) {
    let { value, name } = e.target
    this.setState({
      [name]: value
    })
    if (e.person) {
      this.setState({ person: e.person }, () => {
        this.getPrevGoal()
      })
    }
    if (e.title) {
      this.setState({ title: e.title })
    }
  }

  isFormEnabled() {
    let { person, title } = this.state
    return person && title
  }

  render() {
    let { params } = this.props
    let { quarter, prevGoal } = this.state
    return (
      <div style={ styles.container }>
        <form style={ styles.form } onSubmit={ this.handleSubmit.bind(this) }>
          <GoalForm
            handleChange={ this.handleNameChange.bind(this) }
            params={ params }
            prevGoal={ prevGoal }
          />
          <button
            type="submit"
            style={{ ...styles.button, ...(!this.isFormEnabled() && styles.disabled) }}
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

