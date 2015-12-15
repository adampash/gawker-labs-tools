import React from 'react'
import { Link } from 'react-router'
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

  renderGoals() {
    let { goals, currentUser } = this.props
    return goals.map( (goal) => {
      return (
        <GoalRow goal={ goal } key={ goal.id }
          currentUser={ currentUser }
        />
      )
    })
  }

  render() {
    let { quarter, params } = this.props
    let { siteName, quarter: quarter_id } = params
    if (quarter) {
      return (
        <div>
          <h3>{ `${siteName.toUpperCase()} ${quarter.name}` } <NewLink to={`/sites/${siteName}/goals/${quarter_id}/new`} text="Create new goal" /></h3>
          { this.renderGoals() }
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
