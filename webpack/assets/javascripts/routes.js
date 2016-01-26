import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import AppContainer from './containers/AppContainer'
import Login from './components/Login'
import Home from './components/Home'
import NewEmbed from './components/NewEmbed'
import ShowEmbed from './components/ShowEmbed'
import Embeds from './components/Embeds'
import Nothing from './components/Nothing'
import Galleries from './components/Galleries'
import NewGallery from './components/NewGallery'
import ShowGallery from './components/ShowGallery'
import GalleryEmbed from './containers/GalleryEmbed'
import EmbedEmbed from './containers/EmbedEmbed'
import NewSuggestion from './components/NewSuggestion'
import Styles from './components/Styles'
import NewStyle from './components/NewStyle'
import ShowStyle from './components/ShowStyle'
import Goals from './components/Goals'
import Liveblog from './components/Liveblog'
import Related from './components/Related'
import NewGoal from './components/NewGoal'
import EditGoal from './components/EditGoal'
import ShowGoal from './components/ShowGoal'
import ShowSites from './components/ShowSites'
import ShowQuarter from './components/ShowQuarter'

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
    <Route>
      <Route path="/login" component={Login} />
      <Route path="/" component={AppContainer} name="Dashboard" onEnter={ requireAuth }>
        <IndexRoute component={Home}  name="Dashboard" />
        <Route path="/embeds" name="Embeds" component={ Embeds }>
          <Route path="new" name="New" component={ NewEmbed } />
          <Route path=":embedId" name="Show embed" component={ ShowEmbed } />
        </Route>
        <Route path="/galleries" name="Galleries" component={ Galleries }>
          <Route path="new" name="New" component={ NewGallery } />
          <Route path=":galleryId" name="Show gallery" component={ ShowGallery } />
        </Route>
        <Route path="/styles" name="Styles" component={ Styles }>
          <Route path="new" name="New" component={ NewStyle } />
          <Route path=":styleId" name="Show style" component={ ShowStyle } />
        </Route>
        <Route path="/sites/:siteName/quarters" name="Quarters" component={ Goals }>
          <Route path=":quarter" name="Show goals" component={ ShowQuarter } />
          <Route path=":quarter/new" name="New goal" component={ NewGoal } />
        </Route>
        <Route path="/sites/goals" name="Show sites" component={ ShowSites } />
        <Route path="/sites/:siteName/goals/:goalId" name="Show Goal" component={ ShowGoal } />
        <Route path="/sites/:siteName/goals/:goalId/edit" name="Edit Goal" component={ EditGoal } />
        <Route path="/suggestions/new" name="Suggestions" component={ NewSuggestion } />
        <Route path="/liveblog" name="Liveblog" component={ Liveblog } />
        <Route path="/related" name="Related" component={ Related } />
      </Route>
      <Route path="iframe/galleries/:galleryId" name="iframe_gallery" component={ GalleryEmbed } />
      <Route path="iframe/embeds/:embedId" name="iframe_embed" component={ Nothing } />
    </Route>
  )
  return routes
}

export default getRoutes
