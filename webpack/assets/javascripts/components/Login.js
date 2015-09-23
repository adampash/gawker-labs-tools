import React from 'react'

let loginPath = "/users/auth/google_oauth2/"

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <a href={ loginPath } className="login">
          Login
        </a>
        <div className="login_message">
          Log in will redirect to your Google sign in. Please sign in only with your Gawker email address.
        </div>
      </div>
    )
  }
}
