import { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Radium from 'radium'

@Radium
export default class GalleryImage extends Component {
  render() {
    let { pic, resize } = this.props
    return (
      <div>
        <img
          src={ pic.url }
          style={ styles.img }
          onLoad={() => resize() }
        />
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative'
  },
  img: {
    margin: '0 auto',
    display: 'block',
    maxWidth: '100%',
  },
}
