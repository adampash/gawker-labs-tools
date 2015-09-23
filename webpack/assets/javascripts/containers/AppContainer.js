import React from 'react'
import { connect, dispatch } from 'react-redux'
import { pushState } from 'redux-router'
import { Link } from 'react-router'
import DumbComponent from '../components/DumbComponent'
import NavBar from '../components/NavBar'
import { test } from '../actions/example'


let AppContainer = React.createClass({
  render() {
    const { dispatch, foo, currentUser } = this.props
    return(
      <div>
        <NavBar currentUser={ currentUser } />
        { this.props.children }
      </div>
    )
  }
})

function select(state) {
  return {
    ...state,
  }
}

export default connect(select)(AppContainer)
