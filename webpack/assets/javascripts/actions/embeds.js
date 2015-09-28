import Network from '../Network'

export const CREATE_EMBED = 'CREATE_EMBED'
export const SHOW_EMBED = 'SHOW_EMBED'
export const SHOW_EMBEDS = 'SHOW_EMBEDS'

//
// action creators
//

export function getCurrentUser() {
  return {
    type: GET_CURRENT_USER
  }
}

export function showEmbed(embed) {
  return {
    type: SHOW_EMBED,
    embed
  }
}

export function getEmbedAsync(id) {
  return (dispatch, getState) => {
    let embed = getState().embeds[id]
    if (embed) return dispatch(showEmbed(embed))
    console.log('hitting the api')
    Network.get(`embeds/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(showEmbed(data))
      })
  }

}

export function createEmbed(data, history) {
  return (dispatch, getState) => {
    Network.post('embeds', data)
    .then(response => {
      return response.json()
    })
    .then(data => {
      history.pushState(null, `/embeds/${data.id}`)
      console.log(data)
    })

  }
}

// export function getCurrentUserAsync() {
//   return dispatch => {
//     // dispatch optimistic update
//     setTimeout(() => {
//       // dispatch final update
//       dispatch(test(`${text} async`))
//     }, 1000)
//   }
// }
// 
// export function testAsync(text) {
//   return dispatch => {
//     // dispatch optimistic update
//     dispatch(test(text))
//     setTimeout(() => {
//       // dispatch final update
//       dispatch(test(`${text} async`))
//     }, 1000)
//   }
// }
// 

