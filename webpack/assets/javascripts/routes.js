import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import AppContainer from './containers/AppContainer'
import Login from './components/Login'
import Home from './components/Home'

let getRoutes = (store) => {
  const { getState } = store
  let loggedIn = false
  let auth = {
    loggedIn(state) {
      console.log('current user', state().currentUser)
      let { currentUser } = state()
      return currentUser
    },
  }

  let requireAuth = (nextState, replaceState) => {
    if (!auth.loggedIn(getState)) {
      replaceState({ nextPathname: nextState.location.pathname}, '/login')
    }
  }

  // Configure routes like normal
  const routes = (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Home} onEnter={ requireAuth } />
      <Route path="login" component={Login} />
    </Route>
  )
  return routes
}

export default getRoutes
