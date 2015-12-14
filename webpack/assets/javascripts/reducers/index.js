import { combineReducers } from 'redux'
import * as exampleReducer from './example'
import * as currentUserReducer from './currentUser'
import * as embedsReducer from './embeds'
import * as galleriesReducer from './galleries'
import * as stylesReducer from './styles'
import * as goalsReducer from './goals'
import * as picturesReducer from './pictures'
import { routerStateReducer } from 'redux-router'

const rootReducer = combineReducers({
  ...exampleReducer,
  ...currentUserReducer,
  ...embedsReducer,
  ...galleriesReducer,
  ...picturesReducer,
  ...stylesReducer,
  ...goalsReducer,
  router: routerStateReducer,
})

export default rootReducer
