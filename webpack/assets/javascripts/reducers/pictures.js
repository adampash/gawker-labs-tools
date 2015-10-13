import {
  UPLOAD_PICTURES,
  UPDATE_PICTURE,
  REORDER_PICTURES
} from '../actions/pictures'
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
  case REORDER_PICTURES:
    let { from, to } = action
    let image = state.slice(from, from + 1)[0]
    let without = [
      ...state.slice(0, from),
      ...state.slice(from + 1)
    ]
    return [
      ...without.slice(0, to),
      image,
      ...without.slice(to)
    ]
  case CLEAR_NEW_GALLERY:
    return []
  default:
    return state
  }
}
    // let { files } = this.state
    // let file = this.state.files.slice(from, from + 1)[0]
    // let without = [
    //   ...files.slice(0, from),
    //   ...files.slice(from + 1)
    // ]
    // this.setState({
    //   files: [
    //     ...without.slice(0, to),
    //     file,
    //     ...without.slice(to)
    //   ]
    // })
