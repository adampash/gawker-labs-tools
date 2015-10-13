import { UPLOAD_PICTURES, UPDATE_PICTURE } from '../actions/pictures'
import { CLEAR_NEW_GALLERY } from '../actions/galleries'

export function pictures(state=[], action) {
  switch (action.type) {
  case UPLOAD_PICTURES:
    return [...state, ...action.tempFiles]
  case UPDATE_PICTURE:
    let { index, pic } = action
    return [
      ...state.slice(0, index),
      pic,
      ...state.slice(index + 1)
    ]
  case CLEAR_NEW_GALLERY:
    return []
  default:
    return state
  }
}
