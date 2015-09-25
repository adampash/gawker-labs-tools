import React from 'react'
import { createGallery } from '../actions/galleries'
import Dropzone from 'react-dropzone'
import post from '../post'
import ImageList from './ImageList'

export default class NewGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      uploading: false
    }
  }

  uploadFiles(files, index=0) {
    let file = files[index]
    post('pictures', { file }, 'file')
    .then( response => { return response.json() })
    .then(pic => {
      let { files } = this.state
      this.setState({
        files: [
          ...files.slice(0, index),
          pic,
          ...files.slice(index + 1)
        ]
      })
      if (files.length - 1 === index) {
        return this.setState({ uploading: false })
      }
      this.uploadFiles(files, index += 1)
    })
  }

  onDrop(tempFiles) {
    let { files } = this.state
    let uploadIndex = files.length
    this.setState({
      uploading: true,
      files: [...this.state.files, ...tempFiles]
    }, () => {
      this.uploadFiles(this.state.files, uploadIndex)
    })
  }

  handleSubmit(e) {
    let { dispatch, history } = this.props
    let { files } = this.state
    let picture_ids = files.map( file => { return file.id })
    let description = 'gallery'
    e.preventDefault()
    dispatch(createGallery({picture_ids, description}, history))
  }

  handleChange(e) {
    this.setState({
      code: e.target.value
    })
  }

  reorderImages(from, to) {
    let { files } = this.state
    console.log('reorder images', from, to)
    let file = this.state.files.slice(from, from + 1)[0]
    let without = [
      ...files.slice(0, from),
      ...files.slice(from + 1)
    ]
    this.setState({
      files: [
        ...without.slice(0, to),
        file,
        ...without.slice(to)
      ]
    })
  }

  render() {
    let { files } = this.state
    return (
      <div style={ styles.container }>
        <div style={ styles.topRow }>
          <Dropzone onDrop={ this.onDrop.bind(this) }>
            <div style={ styles.drop_message }>
              Drag and drop images here, or click to select files to upload.
            </div>
          </Dropzone>
          <form style={ styles.form } onSubmit={ this.handleSubmit.bind(this) }>
            <input type="text" placeholder="Gallery name"
              style={ styles.input }
            />
            <button type="submit" style={ styles.button }>
              Create gallery
            </button>
          </form>
        </div>
        <ImageList
          images={ files }
          reorderImages={ this.reorderImages.bind(this) }
        />
      </div>
    )
  }
}

const styles = {
  container: {
    maxWidth: 636,
    width: '100%',
    margin: '20px auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '0px 20px',
  },
  input: {
    fontSize: 16,
    padding: 5,
    marginBottom: 20
  },
  button: {
    padding: 10,
    outline: 'none',
    background: '#f3a',
    border: 'none',
    color: 'white',
    fontSize: 16,
    
  },
  drop_message: {
    padding: 10,
  },
  topRow: {
    display: 'flex'
  }
}

