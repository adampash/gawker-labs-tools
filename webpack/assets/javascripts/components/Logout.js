import React from 'react'
import Radium from 'radium'

let logoutPath = "/logout"

@Radium
export default class Login extends React.Component {
  render() {
    return (
      <div style={ styles.container }>
        <a href={ logoutPath } className="logout">
          Logout
        </a>
      </div>
    )
  }
}

const styles = {
  container: {
    marginRight: 40,
  }
}

