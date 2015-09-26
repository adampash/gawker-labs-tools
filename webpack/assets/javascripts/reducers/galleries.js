import { SHOW_GALLERY, SHOW_GALLERIES } from '../actions/galleries'

export function galleries(state=null, action) {
  switch (action.type) {
  case SHOW_GALLERY:
    let newState = {
      ...state,
      [action.gallery.id]: action.gallery,
    }
    return newState
  case SHOW_GALLERIES:
    let galleries = action.galleries.reduce((obj, gallery) =>
      ({ ...obj, [gallery.id]: gallery }), {}
    )
    return {
      ...state,
      ...galleries
    }
  default:
    return state
  }
}


