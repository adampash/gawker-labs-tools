import Network from '../Network'

export const CREATE_GOAL = 'CREATE_GOAL'
export const SHOW_GOAL = 'SHOW_GOAL'
export const SHOW_GOALS = 'SHOW_GOALS'
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
    Network.get(`sites/${siteName}/goals/${quarter}`)
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

export function updateGoal(data) {
  return {
    type: UPDATE_GOAL,
    ...data
  }
}

export function updateGoalAsync({id, rule, details, keywords}) {
  return (dispatch, getState) => {
    let goal = getState().goals[id]
    dispatch(updateGoal(
      {
        goal: {
          ...goal,
          loading: true
        }
      }
    ))
    Network.put(`goals/${id}`, { rule, details, keywords })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        dispatch(updateGoal(
          {
            goal: {
              ...goal,
              loading: false,
              rule,
              details,
              keywords,
            }
          }))
      })
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
      history.pushState(null, `/goals/${data.id}`)
      dispatch(clearNewGoal())
    })

  }
}


