import React from 'react'

export default class DraggagleImages extends React.Component {
  renderImages() {
    let { images } = this.props
    return images.map( (file, index) => {
      let img_container_style = styles.img_container
      if (file.preview) {
        img_container_style = { ...img_container_style, ...styles.preview }
      }
      return (
        <div key={index} style={ img_container_style }>
          <div style={ styles.number }>{ index + 1 }</div>
          <img src={ file.url || file.preview } style={ styles.thumb } />
        </div>
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
  img_container: {
    position: 'relative',
    transition: 'opacity .5s ease-in-out',
  },
  number: {
    position: 'absolute',
    top: 20,
    right: 20,
    background: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: 30,
    height: 30,
    borderRadius: '50%',
  },
  thumb: {
    maxWidth: 150,
    margin: 10,
  },
  preview: {
    opacity: 0.3,
  }
}
