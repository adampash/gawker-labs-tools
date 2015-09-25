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
    type: SHOW_GALLERY,
    gallery
  }
}

export function getGalleryAsync(id) {
  return (dispatch, getState) => {
    let gallery = getState().galleries[id]
    if (gallery) return dispatch(showGallery(gallery))
    console.log('hitting the api')
    fetch(`/api/galleries/${id}`, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    )
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(showGallery(data))
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
      history.pushState(null, `/galleries/${data.id}`)
      console.log(data)
    })

  }
}
