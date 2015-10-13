import React from 'react'
import Radium from 'radium'
import { createGallery } from '../actions/galleries'
import { uploadPictures, updatePictureAsync, reorderImages } from '../actions/pictures'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import Network from '../Network'
import ImageList from './ImageList'

@Radium
class NewGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      uploading: false,
      galleryName: ''
    }
  }

  uploadFiles(files, index=0) {
    let file = files[index]
    Network.post('pictures', { file }, 'file')
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
    let { dispatch } = this.props
    // let { files } = this.state
    // let uploadIndex = files.length
    dispatch(uploadPictures(tempFiles))
    // this.setState({
    //   uploading: true,
    //   files: [...this.state.files, ...tempFiles]
    // }, () => {
    //   this.uploadFiles(this.state.files, uploadIndex)
    // })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (!this.isFormEnabled()) {
      return alert("Your gallery needs both files and a name")
    }
    let { dispatch, history, pictures } = this.props
    let { galleryName } = this.state
    let picture_ids = pictures.map( pic => { return pic.id })
    dispatch(createGallery({
      picture_ids, description: galleryName
    }, history))
  }

  handleChange(e) {
    this.setState({
      code: e.target.value
    })
  }

  handleUpdatePic({ description, credit, id, index }) {
    let { dispatch } = this.props
    dispatch(updatePictureAsync(index, { description, credit, id }))
  }

  reorderImages(from, to) {
    let { dispatch } = this.props
    dispatch(reorderImages(from, to))
  }

  handleNameChange(e) {
    let { value } = e.target
    this.setState({
      galleryName: value
    })
  }

  isFormEnabled() {
    let { galleryName } = this.state
    let { pictures } = this.props
    return galleryName !== '' && pictures.length !== 0 && !pictures.slice(-1)[0].preview
  }

  render() {
    // let { files } = this.state
    let { pictures } = this.props
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
              onChange={ this.handleNameChange.bind(this) }
              style={ styles.input }
            />
            <button
              type="submit"
              style={[ styles.button, !this.isFormEnabled() && styles.disabled ]}
              disabled={ !this.isFormEnabled() }
            >
              Create gallery
            </button>
          </form>
        </div>
        <ImageList
          images={ pictures }
          reorderImages={ this.reorderImages.bind(this) }
          handleUpdatePic={ this.handleUpdatePic.bind(this) }
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
    marginBottom: 20,
    outline: 'none'
  },
  button: {
    padding: 10,
    outline: 'none',
    background: 'red',
    border: 'none',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer'
  },
  disabled: {
    opacity: 0.5,
  },
  drop_message: {
    padding: 10,
  },
  topRow: {
    display: 'flex'
  }
}


function select(state) {
  let { pictures } = state
  return {
    pictures
  }
}

export default connect(select)(NewGallery)
