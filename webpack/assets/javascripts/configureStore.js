import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import { devTools, persistState } from 'redux-devtools'
import AppContainer from './containers/AppContainer'
import { reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'
// import createHistory from 'history/lib/createHashHistory'

export default function configureStore(initialState) {
  // // Enables your middleware:
  let composers = [
    applyMiddleware(thunk),
    reduxReactRouter({
      createHistory
    })
  ]

  // include devtools and persiststate if enabled
  if (__DEVTOOLS__) {
    composers.push(
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )
  }

  const finalCreateStore = compose(...composers)(createStore)


  let store = finalCreateStore(rootReducer, initialState)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store

}
