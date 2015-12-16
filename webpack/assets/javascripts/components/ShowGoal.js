import React from 'react'
import Radium from 'radium'
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
    let { goal, currentUser } = this.props
    if (goal) {
      return (
        <div style={ styles.container }>
          <h3>{ goal.person.site.toUpperCase() } { goal.quarter.name } Goals</h3>
          <h4>{ goal.person.name } - { goal.job.name }</h4>
          <h4>Primary goals:</h4>
          <p>{ goal.goals}</p>
          <h4>Other goals:</h4>
          <p>{ goal.other_goals}</p>
          { currentUser.manager &&
            <ApproveOrReject approved={ goal.approved } by={ goal.approved_by } />
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
