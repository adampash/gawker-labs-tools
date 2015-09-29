import React from 'react'
import Radium from 'radium'
import OrderedImage from './OrderedImage'

@Radium
export default class ImageList extends React.Component {
  reorderImages(from, to) {
    this.props.reorderImages(from, to)
  }
  renderImages() {
    let { images } = this.props
    return images.map( (file, index) => {
      return (
        <OrderedImage
          key={index}
          index={ index }
          file={ file }
          reorderImages={ this.reorderImages.bind(this) }
          max={ images.length - 1 }
        />
      )
    })
  }

  render() {
    return (
      <div style={ styles.images }>
        { this.renderImages() }
      </div>
    )
  }

}

const styles = {
  images: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}
