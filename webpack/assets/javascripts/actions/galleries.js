import fetch from 'isomorphic-fetch'
import post from '../post'

export const CREATE_GALLERY = 'CREATE_GALLERY'
export const SHOW_GALLERY = 'SHOW_GALLERY'
export const SHOW_GALLERIES = 'SHOW_GALLERIES'

//
// action creators
//

export function showGallery(gallery) {
  return {
    type: SHOW_EMBED,
    embed
  }
}

export function getGalleryAsync(id) {
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

export function createGallery(data, history) {
  return (dispatch, getState) => {
    post('galleries', data)
    .then(response => {
      return response.json()
    })
    .then(data => {
      history.pushState(null, `/embeds/${data.id}`)
      console.log(data)
    })

  }
}
