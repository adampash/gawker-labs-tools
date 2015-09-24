import fetch from 'isomorphic-fetch'
import { Router } from 'react-router'

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
    fetch(`/api/embeds/${id}`, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    )
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
    fetch('/api/embeds/', {
      method: 'post',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(
          document.cookie.match(/XSRF\-TOKEN\=([^;]*)/)[1]
        ),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
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

