import fetch from 'isomorphic-fetch'

let post = (url, data={}, type='json') => {
  let params = {}
  if (type === 'file') {
    let formData = new FormData()
    let { file } = data
    formData.append('file', file)
    data = formData
  }
  else {
    data = JSON.stringify(data)
    params = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return fetch(`/api/${url}`, {
    method: 'post',
    body: data,
    credentials: 'same-origin',
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(
        document.cookie.match(/XSRF\-TOKEN\=([^;]*)/)[1]
      ),
      ...params
    }
  })
}

export default post
