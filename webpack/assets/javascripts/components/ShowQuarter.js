import React from 'react'
import NewLink from './NewLink'
import GoalRow from './GoalRow'
import { connect } from 'react-redux'
import { getGoalsAsync } from '../actions/goals'

class ShowQuarter extends React.Component {
  componentWillMount() {
    let { dispatch } = this.props
    let { siteName, quarter } = this.props.params
    dispatch(getGoalsAsync(siteName, quarter))
  }

  renderGoals(siteName) {
    let { goals, currentUser } = this.props
    return goals.map( (goal) => {
      return (
        <GoalRow goal={ goal } key={ goal.id }
          currentUser={ currentUser }
          siteName={ siteName }
        />
      )
    })
  }

  render() {
    let { quarter, params, goals } = this.props
    let { siteName, quarter: quarter_id } = params
    if (quarter && typeof goals.map === 'function') {
      return (
        <div>
          <h3>{ `${siteName.toUpperCase()} ${quarter.name}` } <NewLink to={`/sites/${siteName}/quarters/${quarter_id}/new`} text="Create new goal" /></h3>
          { this.renderGoals(siteName) }
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

const goals = {
  container: {
  },
  list: {
    maxWidth: 500,
    margin: '0 auto',
  },
}


// function select(state) {
//   let { goals, goalList, quarters } = state
//   return {
//     goals,
//     quarters,
//     goalList
//   }
// }
//
// export default connect(select)(ShowQuarter)
export default ShowQuarter
