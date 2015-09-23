import { combineReducers } from 'redux'
import * as exampleReducer from './example'
import * as currentUserReducer from './currentUser'
import { routerStateReducer } from 'redux-router'

const rootReducer = combineReducers({
  ...exampleReducer,
  ...currentUserReducer,
  router: routerStateReducer,
})

export default rootReducer
