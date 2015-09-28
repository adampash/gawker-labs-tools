import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getGalleriesAsync } from '../actions/galleries'

class Galleries extends React.Component {
  componentWillMount() {
    let { routeParams, dispatch } = this.props
    let { galleryId } = routeParams

    dispatch(getGalleriesAsync())
  }

  renderChildren() {
    let { dispatch, galleries } = this.props
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { dispatch, galleries })
    })
  }

  renderLatest() {
    let { galleries, location, galleryList } = this.props
    if (location.pathname !== '/galleries') return
    return galleryList.map( galleryId => {
      let gallery = galleries[galleryId]
      return (
        <div key={ galleryId }>
          <Link to={`/galleries/${galleryId}`}>
            { gallery.description }
          </Link>
        </div>
      )
    })
  }

  render() {
    let { galleries } = this.props
    if (galleries) {
      return (
        <div>
          <Link to="/galleries/new">
            + Create a new gallery
          </Link>
          { this.renderLatest() }
          { this.renderChildren() }
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}


function select(state) {
  let { galleries, galleryList } = state
  return {
    galleries,
    galleryList
  }
}

export default connect(select)(Galleries)
