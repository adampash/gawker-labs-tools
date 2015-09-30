import React from 'react'
import Radium from 'radium'
import { connect, dispatch } from 'react-redux'
import NavBar from '../components/NavBar'
import Breadcrumbs from '../components/Breadcrumbs'

@Radium
class AppContainer extends React.Component {
  render() {
    let {
      dispatch,
      currentUser,
      routes,
      params,
    } = this.props
    console.log('params',params)
    return (
      <div>
        <NavBar currentUser={ currentUser } />
        <div style={ styles.container }>
          <Breadcrumbs routes={ routes } params={ params } />
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
}

function select(state) {
  let { currentUser } = state
  return {
    currentUser
  }
}

const styles = {
  container: {
    maxWidth: 800,
    padding: '20px 10px',
    margin: '0 auto',
  }
}

export default connect(select)(AppContainer)
