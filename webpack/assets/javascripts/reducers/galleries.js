import { SHOW_GALLERY } from '../actions/galleries'

export function galleries(state={}, action) {
  switch (action.type) {
  case SHOW_GALLERY:
    let newState = {
      ...state,
      [action.gallery.id]: action.gallery,
    }
    return newState
  default:
    return state
  }
}


