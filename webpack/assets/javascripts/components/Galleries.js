import React from 'react'
import { Link } from 'react-router'
import NewLink from './NewLink'
import { connect } from 'react-redux'
import { getGalleriesAsync } from '../actions/galleries'

class Galleries extends React.Component {
  componentWillMount() {
    let { dispatch } = this.props
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
    let list = galleryList.map( galleryId => {
      let gallery = galleries[galleryId]
      return (
        <div key={ galleryId } style={ styles.listItem }>
          <Link to={`/galleries/${galleryId}`}>
            { gallery.description }
          </Link>
        </div>
      )
    })
    return (
      <div style={ styles.list }>
        <h3>
          Your latest galleries
          <NewLink to="/galleries/new" text="New gallery" />
        </h3>
        { list }
      </div>
    )
  }

  render() {
    let { galleries } = this.props
    if (galleries) {
      return (
        <div style={ styles.container }>
          <div style={ styles.childContainer }>
            { this.renderLatest() }
            { this.renderChildren() }
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

const styles = {
  list: {
    maxWidth: 500,
    margin: '0 auto',
  },
}


function select(state) {
  let { galleries, galleryList } = state
  return {
    galleries,
    galleryList
  }
}

export default connect(select)(Galleries)
