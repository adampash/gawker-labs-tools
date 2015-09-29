import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import AppContainer from './containers/AppContainer'
import Login from './components/Login'
import Home from './components/Home'
import NewEmbed from './components/NewEmbed'
import ShowEmbed from './components/ShowEmbed'
import Embeds from './components/Embeds'
import Galleries from './components/Galleries'
import NewGallery from './components/NewGallery'
import ShowGallery from './components/ShowGallery'
import GalleryEmbed from './containers/GalleryEmbed'
import EmbedEmbed from './containers/EmbedEmbed'

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
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Home} onEnter={ requireAuth } />
      <Route path="/login" component={Login} />
      <Route path="embeds" name="embeds" component={ Embeds }>
        <Route path="new" name="new_embed" component={ NewEmbed } />
        <Route path=":embedId" name="show_embed" component={ ShowEmbed } />
      </Route>
      <Route path="galleries" name="galleries" component={ Galleries }>
        <Route path="new" name="new_gallery" component={ NewGallery } />
        <Route path=":galleryId" name="show_gallery" component={ ShowGallery } />
      </Route>
    </Route>
    <Route path="iframe/galleries/:galleryId" name="iframe_gallery" component={ GalleryEmbed } />
    <Route path="iframe/embeds/:embedId" name="iframe_embed" component={ EmbedEmbed } />
    </Route>
  )
  return routes
}

export default getRoutes
