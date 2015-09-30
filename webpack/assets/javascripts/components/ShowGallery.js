import React from 'react'
import Radium from 'radium'
import Gallery from './Gallery'
import EmbedArea from './EmbedArea'
import NewLink from './NewLink'
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

  renderEmbed() {
    let { galleries, routeParams } = this.props
    let { galleryId } = routeParams
    let { copied } = this.state
    let gallery = galleries[galleryId]
    return (
      <div style={ styles.container }>
        <h3>
          { gallery.description.toUpperCase() }
          <NewLink to="/galleries/new" text="New gallery" />
        </h3>
        <Gallery pics={ gallery.pics }/>
        <EmbedArea link={ this.renderLink() } />
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

