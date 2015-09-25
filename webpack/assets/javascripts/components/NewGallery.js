import React from 'react'
import { createEmbed } from '../actions/embeds'
import Dropzone from 'react-dropzone'
import post from '../post'

export default class NewGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      uploading: false
    }
  }

  renderFiles() {
    return this.state.files.map( (file, index) => {
      let img_style = styles.thumb
      if (file.preview) {
        img_style = { ...img_style, ...styles.preview }
      }
      return (
        <div key={index} style={ styles.img_container }>
          <img src={ file.url || file.preview } style={ img_style } />
        </div>
      )
    })
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
    let { code } = this.state
    e.preventDefault()
    dispatch(createEmbed({code}, history))
  }

  handleChange(e) {
    this.setState({
      code: e.target.value
    })
  }

  render() {
    return (
      <div style={ styles.container }>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <Dropzone onDrop={ this.onDrop.bind(this) }>
            <div style={ styles.drop_message }>
              Drag and drop images here, or click to select files to upload.
            </div>
          </Dropzone>
          <button type="submit">Create gallery</button>
        </form>
        <div style={ styles.images }>
          { this.renderFiles() }
        </div>
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
  drop_message: {
    padding: 10,
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  img_container: {
  },
  thumb: {
    maxWidth: 150,
    margin: 10,
    transition: 'opacity .5s ease-in-out',
  },
  preview: {
    opacity: 0.3,
  }
}

