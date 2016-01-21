import React from 'react'
import Radium from 'radium'
import marked from 'react-marked'
import { getGoalAsync } from '../actions/goals'
import { connect } from 'react-redux'
import ApproveOrReject from './ApproveOrReject'


@Radium
class ShowGoal extends React.Component {
  componentWillMount() {
    let { routeParams, dispatch } = this.props
    let { goalId } = routeParams

    dispatch(getGoalAsync(goalId))
  }

  render() {
    let { goal, currentUser, dispatch } = this.props
    if (goal) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: false,
        smartLists: true,
        smartypants: true
      })
      let { goals, other_goals, evaluation } = goal

      return (
        <div style={ styles.container }>
          <h3>{ goal.person.site.toUpperCase() } { goal.quarter.name } Goals</h3>
          <h4>{ goal.person.name } - { goal.job.name }</h4>
          <h4>Primary goals:</h4>
          { goals ? marked(goals) : '' }

          <h4>Other goals:</h4>
          { other_goals ? marked(other_goals) : '' }

          <h4>Evaluation:</h4>
          { evaluation ? marked(evaluation) : '' }
          { currentUser.manager &&
            <ApproveOrReject goal={ goal } dispatch={ dispatch } />
          }
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const styles = {
  container: {
    maxWidth: 636,
    width: '100%',
    margin: '20px auto',
  },
}


function select(state) {
  let { currentUser, goals, router } = state
  let { goalId } = router.params
  let goal = goals.find( goal => {
    return goal.id === parseInt(goalId)
  })
  return {
    currentUser,
    goal,
  }
}

export default connect(select)(ShowGoal)
