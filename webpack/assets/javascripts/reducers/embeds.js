import { SHOW_EMBED, SHOW_EMBEDS } from '../actions/embeds'

export function embeds(state={}, action) {
  switch (action.type) {
  case SHOW_EMBED:
    let newState = {
      ...state,
      [action.embed.id]: action.embed,
    }
    return newState
  case SHOW_EMBEDS:
    let embeds = action.embeds.reduce((obj, embed) =>
      ({ ...obj, [embed.id]: embed }), {}
    )
    return {
      ...state,
      ...embeds
    }
  default:
    return state
  }
}

export function embedsList(state=[], action) {
  switch(action.type) {
  case SHOW_EMBEDS:
    return action.embeds.map( embed =>
      embed.id
    )
  default:
    return state
  }
}
