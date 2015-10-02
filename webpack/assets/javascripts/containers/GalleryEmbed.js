import React from 'react'
import Radium from 'radium'
import Gallery from '../components/Gallery'
import KinjaResizer from '../components/KinjaResizer'
import FontAwesome from 'react-fontawesome'
import { getGalleryAsync } from '../actions/galleries'
import { connect } from 'react-redux'

@Radium
class GalleryEmbed extends React.Component {
  componentWillMount() {
    let { routeParams, dispatch } = this.props
    let { galleryId } = routeParams

    dispatch(getGalleryAsync(galleryId))
  }

  renderEmbed() {
    let { galleries, routeParams } = this.props
    let { galleryId } = routeParams
    let gallery = galleries[galleryId]
    return (
      <KinjaResizer style={ styles.container }>
        <Gallery gallery={ gallery }/>
      </KinjaResizer>
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
    margin: 0,
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

function select(state) {
  let { galleries } = state
  return {
    galleries
  }
}

export default connect(select)(GalleryEmbed)
