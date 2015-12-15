import React from 'react'
import { Link } from 'react-router'
import NewLink from './NewLink'
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
        quarter: quarters[index],
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
        <div key={ quarter.id } quarter={ quarter }>
          <Link to={`/sites/${siteName}/goals/${quarter.q_id}`}>
            { quarter.name }
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
    console.log(React.Children.count())
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
