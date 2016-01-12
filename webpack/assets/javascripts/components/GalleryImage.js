import { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Radium from 'radium'

@Radium
export default class GalleryImage extends Component {
  resize() {
    let { resize } = this.props
  }
  render() {
    let { pic } = this.props
    return (
      <div>
        <img
          src={ pic.url }
          style={ styles.img }
          onLoad={ this.resize.bind(this) }
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
