import {
  SHOW_STYLE,
  SHOW_STYLES,
  UPDATE_STYLE,
} from '../actions/styles'

export function styles(state={}, action) {
  switch (action.type) {
  case SHOW_STYLE:
    let newState = {
      ...state,
      [action.style.id]: action.style,
    }
    return newState
  case SHOW_STYLES:
    let styles = action.styles.reduce((obj, style) =>
      ({ ...obj, [style.id]: style }), {}
    )
    return {
      ...state,
      ...styles
    }
  case UPDATE_STYLE:
    let { style } = action
    return {
      ...state,
      [style.id]: style
    }
  default:
    return state
  }
}

export function styleList(state=[], action) {
  switch(action.type) {
  case SHOW_STYLES:
    return action.styles.map( style =>
      style.id
    )
  default:
    return state
  }
}

