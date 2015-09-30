import Network from '../Network'

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
  Network.get(`galleries/${id}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(showGallery(data))
    })
  }

}

export function showGalleries(galleries) {
  return {
    type: SHOW_GALLERIES,
    galleries
  }
}

export function getGalleriesAsync(id) {
  return (dispatch, getState) => {
    Network.get('galleries')
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(showGalleries(data))
      })
  }

}

export function createGallery(data, history) {
  return (dispatch, getState) => {
    Network.post('galleries', data)
    .then(response => {
      return response.json()
    })
    .then(data => {
      history.pushState(null, `/galleries/${data.id}`)
    })

  }
}
