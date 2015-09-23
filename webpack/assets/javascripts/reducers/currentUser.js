import { GET_CURRENT_USER, LOGIN, LOGOUT } from '../actions/currentUser'

let initialState = window.data.currentUser

export function currentUser(state=initialState, action) {
  switch (action.type) {
  case LOGIN:
    return action.user
  case LOGOUT:
    return {}
  case GET_CURRENT_USER:
    return state
  default:
    return state
  }
}
