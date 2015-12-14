import {
  SHOW_GOAL,
  SHOW_GOALS,
  UPDATE_GOAL,
  SHOW_QUARTERS,
} from '../actions/goals'

export function quarters(state={}, action) {
  switch (action.type) {
  case SHOW_QUARTERS:
    return action.quarters
  default:
    return state
  }
}

export function goals(state=[], action) {
  switch (action.type) {
  case SHOW_GOAL:
    let newState = {
      ...state,
      [action.goal.id]: action.goal,
    }
    return newState
  case SHOW_GOALS:
    return action.goals
  case UPDATE_GOAL:
    let { goal } = action
    return {
      ...state,
      [goal.id]: goal
    }
  default:
    return state
  }
}

export function goalList(state=[], action) {
  switch(action.type) {
  case SHOW_GOALS:
    return action.goals.map( goal =>
      goal.id
    )
  default:
    return state
  }
}


