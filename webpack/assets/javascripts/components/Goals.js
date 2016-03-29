import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getQuartersAsync } from '../actions/goals'

class Goals extends React.Component {
  componentWillMount() {
    let { dispatch } = this.props
    let { siteName } = this.props.params
    dispatch(getQuartersAsync(siteName))
  }

  renderChildren() {
    let { dispatch, quarters, goals, currentUser } = this.props
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        dispatch,
        quarters,
        goals,
        currentUser,
      })
    })
  }

  renderLatest() {
    let { quarters, location, params } = this.props
    let { siteName } = params
    let list = quarters.map( quarter => {
      return (
        <div key={ quarter.id } quarter={ quarter } className="goals">
          <Link to={`/sites/${siteName}/quarters/${quarter.q_id}`}>
            <h3>{ quarter.name }</h3>
          </Link>
        </div>
      )
    })
    return (
      <div>
        <h3>
          Goals by Quarter
        </h3>
        { list }
      </div>
    )
  }

  render() {
    let { quarters, params } = this.props
    if (quarters.length) {
      if (Object.keys(params).length === 1) {
        return (
          <div>
            { this.renderLatest() }
            { this.renderChildren() }
          </div>
        )
      }
      else {
        return (
          <div>
            { this.renderChildren() }
          </div>
        )
      }
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


function select(state) {
  let { goals, goalList, quarters, currentUser } = state
  return {
    goals,
    quarters,
    goalList,
    currentUser,
  }
}

export default connect(select)(Goals)
