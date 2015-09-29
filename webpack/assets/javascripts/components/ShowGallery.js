import React from 'react'
import Radium from 'radium'
import CopyToClipboard from 'react-copy-to-clipboard'
import Gallery from './Gallery'
import FontAwesome from 'react-fontawesome'
import { getGalleryAsync } from '../actions/galleries'

@Radium
export default class ShowGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      copied: false
    }
  }

  componentWillMount() {
    let { routeParams, dispatch } = this.props
    let { galleryId } = routeParams

    dispatch(getGalleryAsync(galleryId))
  }

  renderLink() {
    let { routeParams } = this.props
    let { galleryId } = routeParams
    return `${window.location.origin}/iframe/galleries/${galleryId}`
  }

  renderIframe() {
    return `<iframe src="${this.renderLink()}" class="custom" width="100%" ></iframe>`
  }

  renderEmbed() {
    let { galleries, routeParams } = this.props
    let { galleryId } = routeParams
    let { copied } = this.state
    let gallery = galleries[galleryId]
    return (
      <div style={ styles.container }>
        <Gallery pics={ gallery.pics }/>
        <textarea
          value={ this.renderIframe() }
          readOnly={ true }
          style={ styles.textarea }
          onClick={ (e) => { e.target.select() }}
        >
        </textarea>
        <CopyToClipboard text={ this.renderIframe() }
          onCopy={() => this.setState({copied: true})}>
          <FontAwesome name="copy" /> Copy embed code to clipboard
        </CopyToClipboard>&nbsp;
        { copied && "Copied!" }
      </div>
    )
  }

  render() {
    let { galleries, routeParams } = this.props
    let { galleryId } = routeParams
    if (galleries[galleryId]) {
      return this.renderEmbed()
    }
    else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}

const styles = {
  container: {
    maxWidth: 636,
    width: '100%',
    margin: '20px auto',
  },
  textarea: {
    resize: 'none',
    width: '100%',
    height: 80,
    padding: 10,
    outline: 'none',
  },
  iframe: {
    outline: 'none',
    border: 'none',
  }
}

