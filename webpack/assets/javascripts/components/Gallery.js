import React from 'react'
import SwipeableViews from 'react-swipeable-views'

export default class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  renderImages() {
    let { pics } = this.props
    return pics.map( (pic, index) => {
      return (
        <div key={ index } style={ styles.img_container }>
          <img src={ pic.url } style={ styles.img } />
        </div>
      )
    })
  }

  nextImage() {
    let { index } = this.state
    let { pics } = this.props
    this.setState({
      index: Math.min(index + 1, pics.length - 1)
    })
  }

  prevImage() {
    this.setState({
      index: Math.max(0, this.state.index - 1)
    })
  }

  render() {
    let { index } = this.state
    return (
      <div style={ styles.container }>
        <div
          style={ styles.left }
          onClick={ this.prevImage.bind(this) }
        />
        <SwipeableViews index={ index }>
          { this.renderImages() }
        </SwipeableViews>
        <div
          style={ styles.right }
          onClick={ this.nextImage.bind(this) }
        />
      </div>
    )
      // <ReactSwipe continuous={ false }>
      // </ReactSwipe>
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'stretch',
  },
  img_container: {
    textAlign: 'center',
  },
  img: {
    margin: '0 auto',
    display: 'block',
    maxWidth: '100%'
  },
  left: {
    background: 'black',
    width: 50,
    opacity: 0.2,
  },
  right: {
    background: 'black',
    width: 50,
    opacity: 0.2,
  }
}

// import React from 'react'
// import Slider from 'react-slick'
// 
// export default class Gallery extends React.Component {
//   renderImages() {
//     let { pics } = this.props
//     return pics.map( (pic, index) => {
//       console.log(pic)
//       return (
//         <div key={ index } style={ styles.img_container }>
//           <img src={ pic.url } style={ styles.img } />
//         </div>
//       )
//     })
//   }
//   render() {
//     return (
//       <Slider dots={true}>
//         { this.renderImages() }
//       </Slider>
//     )
//       // <ReactSwipe continuous={ false }>
//       // </ReactSwipe>
//   }
// }
// 
// const styles = {
//   img_container: {
//     textAlign: 'center'
//   },
//   img: {
//     margin: '0 auto',
//     display: 'block',
//     maxWidth: '100%'
//   }
// }
