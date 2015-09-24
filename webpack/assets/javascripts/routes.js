import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import AppContainer from './containers/AppContainer'
import Login from './components/Login'
import Home from './components/Home'
import NewEmbed from './components/NewEmbed'

let getRoutes = (store) => {
  const { getState } = store
  let loggedIn = false
  let auth = {
    loggedIn(state) {
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
      <Route path="/embed/new" name="new_embed" component={NewEmbed} />
    </Route>
  )
  return routes
}

export default getRoutes
