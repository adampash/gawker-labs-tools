import React from 'react'
import { connect, dispatch } from 'react-redux'
import { Link } from 'react-router'
import NavBar from '../components/NavBar'

let AppContainer = React.createClass({
  render() {
    const {
      dispatch,
      currentUser,
    } = this.props
    return (
      <div>
        <NavBar currentUser={ currentUser } />
        <div style={ styles.container }>
          { React.Children.map(this.props.children, (child) => {
            return React.cloneElement(
              child, {
                dispatch,
              })
          })}
        </div>
      </div>
    )
  }
})

function select(state) {
  let { currentUser } = state
  return {
    currentUser
  }
}

const styles = {
  container: {
    maxWidth: 800,
    padding: '40px 0',
    margin: '0 auto',
  }
}

export default connect(select)(AppContainer)
