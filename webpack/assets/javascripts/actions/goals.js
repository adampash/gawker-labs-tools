import Network from '../Network'

export const CREATE_GOAL = 'CREATE_GOAL'
export const SHOW_GOAL = 'SHOW_GOAL'
export const SHOW_GOALS = 'SHOW_GOALS'
export const SHOW_SITES = 'SHOW_SITES'
export const SHOW_QUARTERS = 'SHOW_QUARTERS'
export const UPDATE_GOAL = 'UPDATE_GOAL'
export const CLEAR_NEW_GOAL = 'CLEAR_NEW_GOAL'

//
// action creators
//

export function showGoal(goal) {
  return {
    type: SHOW_GOAL,
    goal
  }
}

export function getGoalAsync(id) {
  return (dispatch, getState) => {
    let goal = getState().goals[id]
    if (goal) dispatch(showGoal(goal))
    Network.get(`goals/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(showGoal(data))
      })
  }

}

export function showSites(sites) {
  return {
    type: SHOW_SITES,
    sites
  }
}

export function getSitesAsync() {
  return (dispatch, getState) => {
    Network.get(`sites/`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(showSites(data))
      })
  }
}

export function showQuarters(quarters) {
  return {
    type: SHOW_QUARTERS,
    quarters
  }
}

export function getQuartersAsync(siteName) {
  return (dispatch, getState) => {
    Network.get(`sites/${siteName}/goals`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(showQuarters(data))
      })
  }
}

export function showGoals(goals) {
  return {
    type: SHOW_GOALS,
    goals
  }
}

export function getGoalsAsync(siteName, quarter) {
  return (dispatch, getState) => {
    dispatch(showGoals([]))
    Network.get(`sites/${siteName}/quarters/${quarter}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(showGoals(data))
      })
  }

}

function clearNewGoal() {
  return {
    type: CLEAR_NEW_GOAL
  }
}

export function updateGoal(goal) {
  return {
    type: UPDATE_GOAL,
    goal
  }
}

export function createGoal(data, history) {
  let { siteName } = data
  return (dispatch, getState) => {
    Network.post(`sites/${siteName}/goals`, data)
    .then(response => {
      return response.json()
    })
    .then(data => {
      history.pushState(null, `/sites/${siteName}/goals/${data.id}`)
      dispatch(clearNewGoal())
    })

  }
}

export function approveGoal(id) {
  return (dispatch, getState) => {
    Network.post(`goals/${id}/approve`, id)
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(updateGoal(data))
    })

  }
}

export function rejectGoal(data) {
  return (dispatch, getState) => {
    Network.post(`goals/${data.id}/reject`, data)
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(updateGoal(data))
    })

  }
}

export function updateGoalAsync(data, history) {
  let { siteName, goalId } = data
  return (dispatch, getState) => {
    Network.put(`sites/${siteName}/goals/${goalId}`, data)
    .then(response => {
      return response.json()
    })
    .then(data => {
      history.pushState(null, `/sites/${siteName}/goals/${data.id}`)
      dispatch(clearNewGoal())
      dispatch(updateGoal(data))
    })

  }
}
