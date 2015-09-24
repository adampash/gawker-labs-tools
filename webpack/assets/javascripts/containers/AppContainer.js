import React from 'react'
import { connect, dispatch } from 'react-redux'
import { Link } from 'react-router'
import NavBar from '../components/NavBar'
import { test } from '../actions/example'


let AppContainer = React.createClass({
  render() {
    const {
      dispatch,
      foo,
      currentUser,
      embeds
    } = this.props
    return(
      <div>
        <NavBar currentUser={ currentUser } />
        <div style={ styles.container }>
          { React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { dispatch, embeds })
          })}
        </div>
      </div>
    )
  }
})

function select(state) {
  return {
    ...state,
  }
}

const styles = {
  container: {
    maxWidth: 800,
    padding: 40,
    margin: '0 auto',
  }
}

export default connect(select)(AppContainer)
