import Network from '../Network'

export const CREATE_STYLE = 'CREATE_STYLE'
export const SHOW_STYLE = 'SHOW_STYLE'
export const SHOW_STYLES = 'SHOW_STYLES'
export const UPDATE_STYLE = 'UPDATE_STYLE'
export const CLEAR_NEW_STYLE = 'CLEAR_NEW_STYLE'

//
// action creators
//

export function showStyle(style) {
  return {
    type: SHOW_STYLE,
    style
  }
}

export function getStyleAsync(id) {
  return (dispatch, getState) => {
    let style = getState().styles[id]
    if (style) dispatch(showStyle(style))
    Network.get(`styles/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(showStyle(data))
      })
  }

}

export function showStyles(styles) {
  return {
    type: SHOW_STYLES,
    styles
  }
}

export function getStylesAsync(id) {
  return (dispatch, getState) => {
    Network.get('styles')
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(showStyles(data))
      })
  }

}

function clearNewStyle() {
  return {
    type: CLEAR_NEW_STYLE
  }
}

export function updateStyle(data) {
  return {
    type: UPDATE_STYLE,
    ...data
  }
}

export function updateStyleAsync({id, rule, details, keywords}) {
  return (dispatch, getState) => {
    let style = getState().styles[id]
    dispatch(updateStyle(
      {
        style: {
          ...style,
          loading: true
        }
      }
    ))
    Network.put(`styles/${id}`, { rule, details, keywords })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        dispatch(updateStyle(
          {
            style: {
              ...style,
              loading: false,
              rule,
              details,
              keywords,
            }
          }))
      })
  }

}

export function createStyle(data, history) {
  return (dispatch, getState) => {
    Network.post('styles', data)
    .then(response => {
      return response.json()
    })
    .then(data => {
      history.pushState(null, `/styles/${data.id}`)
      dispatch(clearNewStyle())
    })

  }
}

