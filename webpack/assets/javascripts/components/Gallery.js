import React from 'react'
import Slider from 'react-slick'

export default class Gallery extends React.Component {
  renderImages() {
    let { pics } = this.props
    return pics.map( (pic, index) => {
      console.log(pic)
      return (
        <div key={ index } style={ styles.img_container }>
          <img src={ pic.url } style={ styles.img } />
        </div>
      )
    })
  }
  render() {
    return (
      <Slider >
        { this.renderImages() }
      </Slider>
    )
      // <ReactSwipe continuous={ false }>
      // </ReactSwipe>
  }
}

const styles = {
  img_container: {
    textAlign: 'center'
  },
  img: {
    margin: '0 auto',
    display: 'block',
    maxWidth: '100%'
  }
}
