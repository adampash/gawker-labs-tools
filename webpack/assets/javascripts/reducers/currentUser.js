import { GET_CURRENT_USER, LOGIN, LOGOUT } from '../actions/currentUser'

export function currentUser(state=null, action) {
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
