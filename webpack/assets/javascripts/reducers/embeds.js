import { SHOW_EMBED } from '../actions/embeds'

export function embeds(state={}, action) {
  switch (action.type) {
  case SHOW_EMBED:
    let newState = {
      ...state,
      [action.embed.id]: action.embed,
    }
    return newState
  default:
    return state
  }
}

