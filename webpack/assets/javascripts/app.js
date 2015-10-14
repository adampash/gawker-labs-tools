import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  DevTools,
  DebugPanel,
  LogMonitor
} from 'redux-devtools/lib/react'
import configureStore from './configureStore'
import AppContainer from './containers/AppContainer'
import { ReduxRouter } from 'redux-router'
import getRoutes from './routes'

window.React = React

require('babel-core/polyfill')

let initialState = window.data
let store = configureStore(initialState)

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            {getRoutes(store)}
          </ReduxRouter>
        </Provider>
        {__DEVTOOLS__ &&
          <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
          </DebugPanel>
        }
      </div>
    )
  }
}

ReactDOM.render(<Root /> , document.querySelector('#root'))
