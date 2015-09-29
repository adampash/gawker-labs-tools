import { Component } from 'react'
import Login from './Login'
import Logout from './Logout'
import { Link } from 'react-router'

export default class NavBar extends Component {
  renderLoginOut() {
    let { currentUser } = this.props
    if (currentUser) {
      return <Logout />
    }
    // else {
    //   return <Login />
    // }
  }

  render() {
    let logInOut = this.renderLoginOut()
    return (
      <nav className="header">
        <h1 className="site"><Link to="/">Gawker Labs Toolkit</Link></h1>
        { logInOut }
      </nav>
    )
  }
}
