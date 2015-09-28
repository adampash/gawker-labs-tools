import { Component } from 'react'

export default class GalleryImage extends Component {
  render() {
    let { pic, resize } = this.props
    return (
      <img
        src={ pic.url }
        style={ styles.img }
        onLoad={() => resize() }
      />
    )
  }
}

const styles = {
  img: {
    margin: '0 auto',
    display: 'block',
    maxWidth: '100%'
  },
}
