import Network from '../Network'

export const UPDATE_PICTURE = 'UPDATE_PICTURE'
export const UPLOAD_PICTURES = 'UPLOAD_PICTURES'
export const REORDER_PICTURES = 'REORDER_PICTURES'

//
// action creators
//

export function updatePicture(index, data) {
  return {
    type: UPDATE_PICTURE,
    index,
    ...data
  }
}

export function reorderImages(from, to) {
  return {
    type: REORDER_PICTURES,
    from,
    to
  }
}

export function reorderImagesAndUpdateGallery(galleryId, from, to) {
  return (dispatch, getState) => {
    Network.put(`galleries/${galleryId}`, { position: { from, to } })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        dispatch(reorderImages(from, to))
      })
      .catch(e => {
        console.log(e)
        alert(`Something went wrong. Send an email to labs@gawker.com with as many details as you've got.`)
      })
  }
}

export function updatePictureAsync(index, {id, description, credit}) {
  return (dispatch, getState) => {
    let pic = getState().pictures[index]
    dispatch(updatePicture(index, { pic: { ...pic, loading: true }}))
    Network.put(`pictures/${id}`, { description, credit })
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(updatePicture(
          index,
          {
            pic: {
              ...pic,
              loading: false,
              description,
              credit,
            }
          }))
      })
  }

}

function uploadFiles(files, index=0, offset=0) {
  return (dispatch, getState) => {
    let file = files[index]
    Network.post('pictures', { file }, 'file')
    .then( response => { return response.json() })
    .then(pic => {
      dispatch(updatePicture(index + offset, { pic }))
      if (files.length - 1 === index) return
      dispatch(uploadFiles(files, index += 1, offset))
    })
  }
}

function appendTemp(tempFiles) {
  return {
    type: UPLOAD_PICTURES,
    tempFiles,
  }
}

export function uploadPictures(tempFiles=[]) {
  return (dispatch, getState) => {
    let { pictures } = getState()
    dispatch(appendTemp(tempFiles))
    dispatch(uploadFiles(tempFiles, 0, pictures.length))
  }
}

