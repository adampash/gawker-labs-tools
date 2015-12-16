import {
  SHOW_GOAL,
  SHOW_GOALS,
  SHOW_SITES,
  UPDATE_GOAL,
  SHOW_QUARTERS,
} from '../actions/goals'

export function sites(state=[], action) {
  switch (action.type) {
    case SHOW_SITES:
      return action.sites
    default:
      return state
  }
}

export function quarters(state={}, action) {
  switch (action.type) {
  case SHOW_QUARTERS:
    return action.quarters
  default:
    return state
  }
}

function pushOrReplaceGoal(goal, goals) {
  let newState = goals.reduce( (acc, item) => {
    if (item.id !== goal.id) {
      acc.push(item)
    }
    return acc
  }, [])
  newState.push(goal)
  return newState
}

export function goals(state=[], action) {
  switch (action.type) {
  case SHOW_GOAL:
    return pushOrReplaceGoal(action.goal, state)
  case SHOW_GOALS:
    return action.goals
  case UPDATE_GOAL:
    return pushOrReplaceGoal(action.goal, state)
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


